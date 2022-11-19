import { useState, useEffect } from "react";

import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../configuration/firebaseConfiguration";

export function useSaveLocalList(list) {
    const groceryListString = JSON.stringify(list);
    localStorage.setItem('localGroceryList', groceryListString);
}

export function useUpdateDocFirestore(data) {
    useEffect(() => {
        updateDocList(data);
    }, [data])
}

export function updateDocList(data) {
    if (data.isSignIn) {
        const uid = data.user.id;
        const userDataRef = doc(db, "users", uid);
        const updateData = {
            ...data.user,
            groceryList: data.groceryList,
        }

        updateDoc(userDataRef, updateData)
    }
}