import axios from "axios";

const EXCHANGE_RATE_API = (symbol: string) =>
    "https://api.mobula.io/api/1/market/data?symbol=" + symbol;

export const getPrice = async (symbol: string) => {
    console.log("api call")
    const res = await axios.get(EXCHANGE_RATE_API(symbol), {
        headers: {
            Authorization: import.meta.env.VITE_MB,
        },
    });
    const data = await res.data;
    console.log(data)
    return Number(data.data.price);
};