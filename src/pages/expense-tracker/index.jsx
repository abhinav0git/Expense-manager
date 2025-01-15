import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/fire-config";
import "./styles.css";
import { LogOut } from "lucide-react";
import { Stack, Button } from '@mui/material';

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");
  const [showTransactions, setShowTransactions] = useState(false);

  const toggleTransactions = () => {
    setShowTransactions((prev) => !prev);
  };

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="expense-tracker">

      <div className="header-container">
        <text>{name}'s Wallet🪙</text>
        <button className="sign-out-button" onClick={signUserOut}>
          <LogOut />
        </button>
      </div>

      <main>
        {/* total dp and balance */}
        <section className="balance">
          {profilePhoto && (
            <div className="profile">
              <img className="profile-photo" alt="Profile" src={profilePhoto} />
            </div>
          )}
          <h3>Current Balance</h3>
          <h2>{balance >= 0 ? `₹${balance}` : `-₹${Math.abs(balance)}`}</h2>
        </section>

        {/* income and expenses */}
        <section className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>₹{income}</p>
          </div>
          <div className="expenses">
            <h4>Expenses</h4>
            <p>₹{expenses}</p>
          </div>
        </section>

        {/* add transaction form */}
        <form className="add-transaction" onSubmit={onSubmit}>
          <div className="input-area">
            <input
              type="number"
              placeholder="₹0.00"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="radio-area">
            <label>
              <input
                type="radio"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Expense
            </label>
            <label>
              <input
                type="radio"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Income
            </label>
          </div>
          <Stack spacing={2} direction="row">
            <Button type="submit" variant="contained">Add Transaction</Button>
            <Button onClick={toggleTransactions}>
              {showTransactions ? "Hide Transactions" : "Show Transactions"}
            </Button>
          </Stack>
        </form>

        {showTransactions && (
          <section className="transactions">
            <h2>Transactions</h2>
            <ul>
              {transactions?.map((transaction, index) => {
                const { description, transactionAmount, transactionType } = transaction;
                return (
                  <li key={index}>
                    <h4>{description}</h4>
                    <p>
                      ₹{transactionAmount}•{" "}
                      <span style={{ color: transactionType === "expense" ? "#e74c3c" : "#27ae60" }}>
                        {transactionType}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

