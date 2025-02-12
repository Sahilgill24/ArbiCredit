import { usePortfolioStore } from "@/stores/portfolio-store";
import Transaction from "./transaction";

const Transactions = () => {
  const { transactions, setTransactions } = usePortfolioStore();
  // TODO: Do all the transaction fetching work here
  return (
    <>
      {transactions.map((transaction, index) => (
        <Transaction key={index} {...transaction} />
      ))}
    </>
  );
};

export default Transactions;
