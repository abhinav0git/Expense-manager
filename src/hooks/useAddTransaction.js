import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/fire-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

export const useAddTransaction = () => {
     const transactionCollectionRef = collection(db, "transaction");
     const {userID} = useGetUserInfo();

     const addTransaction = async ({description, transactionAmount, transactionType}) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
     };

   return {addTransaction};
};