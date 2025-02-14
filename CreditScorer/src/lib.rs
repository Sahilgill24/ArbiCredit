// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use std::fmt;
use std::fmt::Write;
use stylus_sdk::storage::{StorageAddress, StorageArray, StorageI32, StorageU32};
use stylus_sdk::stylus_core::log;
/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{
    alloy_primitives::{Address, FixedBytes, I32, U256, U32},
    prelude::*,
};
use stylus_sdk::{alloy_sol_types::sol, evm};

// scale , to not use Decimal math
const SCALE: i32 = 1000;

// the dimensions , I have kept small , because otherwise it would be too much compuationally
// heavy to be done on-chain
const INPUT_SIZE: usize = 3;
//input neurons 3
const HIDDEN_SIZE: usize = 4;
// hidden layer neurons
const OUTPUT_SIZE: usize = 1;
// final output we are getting
const WEIGHTS_IH_SIZE: usize = INPUT_SIZE * HIDDEN_SIZE;
const WEIGHTS_HO_SIZE: usize = HIDDEN_SIZE * OUTPUT_SIZE;

#[entrypoint]
#[storage]
pub struct CreditScorer {
    /// The owner.
    owner: StorageAddress,
    /// A counter used for RNG seeding.
    rng_seed: StorageU32,
    /// Weights for input-to-hidden layer (size = INPUT_SIZE * HIDDEN_SIZE).
    weights_ih: StorageArray<StorageI32, WEIGHTS_IH_SIZE>,
    /// Bias for the hidden layer (size = HIDDEN_SIZE).
    bias_h: StorageArray<StorageI32, HIDDEN_SIZE>,
    /// Weights for hidden-to-output layer (size = HIDDEN_SIZE * OUTPUT_SIZE).
    weights_ho: StorageArray<StorageI32, WEIGHTS_HO_SIZE>,
    /// Bias for the output layer (size = OUTPUT_SIZE).
    bias_o: StorageArray<StorageI32, OUTPUT_SIZE>,
}

#[public]
impl CreditScorer {
    pub fn supports_interface(&self, interface: FixedBytes<4>) -> bool {
        let interface_slice_array: [u8; 4] = interface.as_slice().try_into().unwrap();
        let id = u32::from_be_bytes(interface_slice_array);
        id == 0x01ffc9a7 || // ERC-165
        id == 0x80ac58cd || // ERC-721
        id == 0x5b5e139f // ERC-721Metadata
    }

    /// Mint the single token
    pub fn mint(&mut self, to: Address) {
        self.owner.set(to);
        self.rng_seed.set(U32::from(1));
    }

    /// Initialize the network’s weights and biases.
    /// We set the weights randomly (here using our simple pseudo‑random function)
    /// and biases to zero.
    pub fn initialize_network(&mut self, seed: u32) {
        let mut rng_seed = seed;
        // Initialize input-to-hidden weights.
        for idx in 0..WEIGHTS_IH_SIZE {
            let (rand_val, new_seed) = Self::pseudo_random(rng_seed);
            rng_seed = new_seed;
            // Map rand_val (0–99) to a weight in roughly [–500, 500).
            let weight = (rand_val as i32 * 10) - 500;
            self.weights_ih
                .setter(idx)
                .unwrap()
                .set(I32::unchecked_from(weight));
        }
        // Initialize hidden biases to 0.
        for idx in 0..HIDDEN_SIZE {
            self.bias_h.setter(idx).unwrap().set(I32::unchecked_from(0));
        }
        // Initialize hidden-to-output weights.
        for idx in 0..WEIGHTS_HO_SIZE {
            let (rand_val, new_seed) = Self::pseudo_random(rng_seed);
            rng_seed = new_seed;
            let weight = (rand_val as i32 * 10) - 500;
            self.weights_ho
                .setter(idx)
                .unwrap()
                .set(I32::unchecked_from(weight));
        }
        // Initialize output biases to 0.
        for idx in 0..OUTPUT_SIZE {
            self.bias_o.setter(idx).unwrap().set(I32::unchecked_from(0));
        }
        self.rng_seed.set(U32::from(rng_seed));
    }

    // First forward pss through the Network
    pub fn predict(&self, x0: i32, x1: i32, x2: i32) -> i32 {
        let input: [i32; INPUT_SIZE] = [x0, x1, x2];

        // --- Compute hidden layer activations ---
        let mut hidden: [i32; HIDDEN_SIZE] = [0; HIDDEN_SIZE];
        for j in 0..HIDDEN_SIZE {
            // Start with the bias.
            let bias = self.bias_h.get(j).unwrap().as_i32();
            let mut sum = bias;
            for i in 0..INPUT_SIZE {
                let weight = self.weights_ih.get(j * INPUT_SIZE + i).unwrap().as_i32();
                // Multiply and scale down.
                sum += (weight * input[i]) / SCALE;
            }
            // ReLU activation: f(x) = max(0, x)
            hidden[j] = if sum > 0 { sum } else { 0 };
        }

        // --- Compute output layer ---
        let mut output: [i32; OUTPUT_SIZE] = [0; OUTPUT_SIZE];
        for k in 0..OUTPUT_SIZE {
            let bias = self.bias_o.get(k).unwrap().as_i32();
            let mut sum = bias;
            for j in 0..HIDDEN_SIZE {
                let weight = self.weights_ho.get(k * HIDDEN_SIZE + j).unwrap().as_i32();
                sum += (weight * hidden[j]) / SCALE;
            }
            output[k] = sum;
        }
        let result = output[0];

        result
    }

    /// Train the network on a single sample using one step of gradient descent.
    ///
    /// - The inputs (x0, x1, x2) are expected to be scaled by SCALE (e.g. 1.0 = 1000).
    /// - `target` is the desired output (scaled by SCALE).
    /// - `learning_rate` is given as a percentage (0–100).
    pub fn train_sample(&mut self, x0: i32, x1: i32, x2: i32, target: i32, learning_rate: u32) {
        let input: [i32; INPUT_SIZE] = [x0, x1, x2];

        // --- Forward pass: compute hidden layer (pre‑activation and activation) ---
        let mut hidden_pre: [i32; HIDDEN_SIZE] = [0; HIDDEN_SIZE];
        let mut hidden: [i32; HIDDEN_SIZE] = [0; HIDDEN_SIZE];
        for j in 0..HIDDEN_SIZE {
            let bias = self.bias_h.get(j).unwrap().as_i32();
            let mut sum = bias;
            for i in 0..INPUT_SIZE {
                let weight = self.weights_ih.get(j * INPUT_SIZE + i).unwrap().as_i32();
                sum += (weight * input[i]) / SCALE;
            }
            hidden_pre[j] = sum;
            // ReLU activation.
            hidden[j] = if sum > 0 { sum } else { 0 };
        }

        // --- Compute output layer ---
        let mut output: [i32; OUTPUT_SIZE] = [0; OUTPUT_SIZE];
        for k in 0..OUTPUT_SIZE {
            let bias = self.bias_o.get(k).unwrap().as_i32();
            let mut sum = bias;
            for j in 0..HIDDEN_SIZE {
                let weight = self.weights_ho.get(k * HIDDEN_SIZE + j).unwrap().as_i32();
                sum += (weight * hidden[j]) / SCALE;
            }
            output[k] = sum;
        }

        // --- Compute error (for our single output neuron) ---
        let error = output[0] - target;

        // --- Backpropagation: update hidden-to-output weights and bias ---
        for j in 0..HIDDEN_SIZE {
            // Gradient for weight from hidden[j] to output:
            let grad = (error * hidden[j]) / SCALE;
            // For OUTPUT_SIZE == 1, the weight index is just j.
            let idx = j;
            let old_weight = self.weights_ho.get(idx).unwrap().as_i32();
            // Update rule: weight = weight - (learning_rate * grad)/100.
            let new_weight = old_weight - ((learning_rate as i32 * grad) / 100);
            self.weights_ho
                .setter(idx)
                .unwrap()
                .set(I32::unchecked_from(new_weight));
        }
        // Update output bias.
        let old_bias_o = self.bias_o.get(0).unwrap().as_i32();
        let new_bias_o = old_bias_o - ((learning_rate as i32 * error) / 100);
        self.bias_o
            .setter(0)
            .unwrap()
            .set(I32::unchecked_from(new_bias_o));

        // --- Backpropagate to hidden layer ---
        let mut delta_hidden: [i32; HIDDEN_SIZE] = [0; HIDDEN_SIZE];
        for j in 0..HIDDEN_SIZE {
            // Derivative of ReLU: 1 if pre-activation > 0, else 0.
            let derivative = if hidden_pre[j] > 0 { 1 } else { 0 };
            // For a single output neuron, delta_hidden = derivative * (error * weight_ho) / SCALE.
            let weight_ho = self.weights_ho.get(j).unwrap().as_i32();
            delta_hidden[j] = derivative * (error * weight_ho) / SCALE;
        }

        // --- Update input-to-hidden weights and hidden biases ---
        for j in 0..HIDDEN_SIZE {
            for i in 0..INPUT_SIZE {
                let grad = (delta_hidden[j] * input[i]) / SCALE;
                let idx = j * INPUT_SIZE + i;
                let old_weight = self.weights_ih.get(idx).unwrap().as_i32();
                let new_weight = old_weight - ((learning_rate as i32 * grad) / 100);
                self.weights_ih
                    .setter(idx)
                    .unwrap()
                    .set(I32::unchecked_from(new_weight));
            }
            // Update hidden bias.
            let old_bias = self.bias_h.get(j).unwrap().as_i32();
            let new_bias = old_bias - ((learning_rate as i32 * delta_hidden[j]) / 100);
            self.bias_h
                .setter(j)
                .unwrap()
                .set(I32::unchecked_from(new_bias));
        }
    }
}
//Private functions of the Contract
impl CreditScorer {
    fn pseudo_random(seed: u32) -> (u32, u32) {
        let a: u32 = 1664525;
        let c: u32 = 1013904223;
        let new_seed = seed.wrapping_mul(a).wrapping_add(c);
        let random = new_seed % 100;
        (random, new_seed)
    }

    // Get the weights of the Hidden layer
    fn get_weights_ih(&self) -> [i32; WEIGHTS_IH_SIZE] {
        let mut arr = [0; WEIGHTS_IH_SIZE];
        for i in 0..WEIGHTS_IH_SIZE {
            arr[i] = self.weights_ih.get(i).unwrap().as_i32();
        }
        arr
    }

    // get the biases of the Hidden layer
    fn get_bias_h(&self) -> [i32; HIDDEN_SIZE] {
        let mut arr = [0; HIDDEN_SIZE];
        for i in 0..HIDDEN_SIZE {
            arr[i] = self.bias_h.get(i).unwrap().as_i32();
        }
        arr
    }

    // get the weights of the output layer
    fn get_weights_ho(&self) -> [i32; WEIGHTS_HO_SIZE] {
        let mut arr = [0; WEIGHTS_HO_SIZE];
        for i in 0..WEIGHTS_HO_SIZE {
            arr[i] = self.weights_ho.get(i).unwrap().as_i32();
        }
        arr
    }

    // Get the weights of the output layer
    fn get_bias_o(&self) -> [i32; OUTPUT_SIZE] {
        let mut arr = [0; OUTPUT_SIZE];
        for i in 0..OUTPUT_SIZE {
            arr[i] = self.bias_o.get(i).unwrap().as_i32();
        }
        arr
    }
}
