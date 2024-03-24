import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { auth } from "../../config/fire-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transaction, transactionTotals } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

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
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>

          {profilePhoto && (
          <div className="profile">
            {" "}
            <img className="profile-photo" alt="pfp" src={profilePhoto} />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
          <div className="balance">
            <h3>Total Balance</h3>
            {balance >= 0 ? <h2> Rs.{balance}</h2> : <h2> -Rs.{balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>Rs.{income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>Rs.{expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <div className="input-area">
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            </div>

            <div className="radio-area">
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />

            <label htmlFor="expense"> Expense </label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income </label>
            </div>
            <button type="submit"> Add Transaction </button>
          </form>
        </div>
      </div>
      <div className="transactions">
        <h2 className="title-trans"> Transactions</h2>
        <ul>
          {transaction?.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4> {description} </h4>
                <p>
                  Rs.{transactionAmount} • {" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
