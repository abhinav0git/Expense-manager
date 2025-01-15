import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../config/fire-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

export const useClearAllTransactions = () => {
    const transactionCollectionRef = collection(db, "transaction");
    const { userID } = useGetUserInfo();

    const clearTransactions = async () => {
        const q = query(transactionCollectionRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    };

    return { clearTransactions };
};