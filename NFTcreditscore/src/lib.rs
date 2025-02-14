#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use std::fmt::Write;
use stylus_sdk::storage::StorageAddress;
use stylus_sdk::{
    alloy_primitives::{Address, FixedBytes, U32},
    prelude::*,
};
use stylus_sdk::{alloy_sol_types::sol, evm};

#[entrypoint]
#[storage]
pub struct NFTCredit {
    // owner of the deployment contract
    owner: StorageAddress,
}

#[public]
impl NFTCredit {
    pub fn supports_interface(&self, interface: FixedBytes<4>) -> bool {
        let interface_slice_array: [u8; 4] = interface.as_slice().try_into().unwrap();
        // Convert interface_id to u32 for easier comparison
        let id = u32::from_be_bytes(interface_slice_array);

        // Compare with known interface IDs
        id == 0x01ffc9a7 || // ERC-165
        id == 0x80ac58cd || // ERC-721
        id == 0x5b5e139f // ERC-721Metadata
    }

    /// Optional mint function to set the owner.
    pub fn mint(&mut self, to: Address) {
        self.owner.set(to);
    }

    //
    // A data URI containing Base64‑encoded JSON metadata with two fields: "platform" and "creditScore".
    #[selector(name = "tokenURI")]
    pub fn token_uri(&self, deploy_addr: Address, credit_score: U32) -> String {
        let mut json = String::new();
        let _ = write!(
            json,
            "{{\"platform\":\"{}\",\"creditScore\":\"{}\"}}",
            deploy_addr, credit_score
        );

        // Return the metadata as a Base64-encoded data URI.
        format!(
            "data:application/json;base64,{}",
            Self::base64_encode(json.as_bytes())
        )
    }
}

impl NFTCredit {
    fn base64_encode(input: &[u8]) -> String {
        const ALPHABET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let mut result = String::with_capacity((input.len() + 2) / 3 * 4);
        for chunk in input.chunks(3) {
            let b = match chunk.len() {
                3 => ((chunk[0] as u32) << 16) | ((chunk[1] as u32) << 8) | (chunk[2] as u32),
                2 => ((chunk[0] as u32) << 16) | ((chunk[1] as u32) << 8),
                1 => (chunk[0] as u32) << 16,
                _ => unreachable!(),
            };

            result.push(ALPHABET[((b >> 18) & 0x3F) as usize] as char);
            result.push(ALPHABET[((b >> 12) & 0x3F) as usize] as char);

            if chunk.len() > 1 {
                result.push(ALPHABET[((b >> 6) & 0x3F) as usize] as char);
            } else {
                result.push('=');
            }

            if chunk.len() > 2 {
                result.push(ALPHABET[(b & 0x3F) as usize] as char);
            } else {
                result.push('=');
            }
        }
        result
    }
}
