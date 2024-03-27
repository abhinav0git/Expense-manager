import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/fire-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const transactionCollectionRef = collection(db, "transaction");
  console.log(transactions);
  const { userID } = useGetUserInfo();

  // const getTransactions = async () => {
  //   let unsubscribe;
  //   try {
  //     const queryTransactions = query(
  //       transactionCollectionRef,
  //       where("userID", "==", userID),
  //       orderBy("createdAt")
  //     );

  //     unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
  //       let docs = [];
  //       let totalIncome = 0;
  //       let totalExpenses = 0;

  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         const id = doc.id;

  //         docs.push({ ...data, id });

  //         if (data.transactionType === "expense") {
  //           totalExpenses += Number(data.transactionAmount);
  //         } else {
  //           totalIncome += Number(data.transactionAmount);
  //         }

  //         console.log(totalExpenses, totalIncome);
  //       });

  //       setTransactions(docs);

  //       let balance = totalIncome - totalExpenses;
  //       setTransactionTotals({
  //         balance,
  //         expenses: totalExpenses,
  //         income: totalIncome,
  //       });
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   return () => unsubscribe();
  // };

  useEffect(() => {
    const getTransactions = async () => {
      let unsubscribe;
      try {
        const queryTransactions = query(
          transactionCollectionRef,
          where("userID", "==", userID),
          orderBy("createdAt")
        );
            // console.log(queryTransactions);
        unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
          let docs = [];
          let totalIncome = 0;
          let totalExpenses = 0;
          // console.log(snapshot);
          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
  
            docs.push({ ...data, id });
  
            if (data.transactionType === "expense") {
              totalExpenses += Number(data.transactionAmount);
            } else {
              totalIncome += Number(data.transactionAmount);
            }
  
            // console.log(totalExpenses, totalIncome);
          });
  
          setTransactions(docs);
  
          let balance = totalIncome - totalExpenses;
          setTransactionTotals({
            balance,
            expenses: totalExpenses,
            income: totalIncome,
          });
        });
      } catch (err) {
        console.error(err);
      }
  
      return () => unsubscribe();
    };
    getTransactions();

  }, []);
  
  return { transactions, transactionTotals };
};