import { doc, getDoc } from "firebase/firestore";
import { db } from "../configuration/firebaseConfiguration";

export async function getFirestore(user) {
    try {
        const getDoc = await getDoc(doc(db, "users", user));
        if (!getDoc.exist()) {

        }

        return { getDoc }
    } catch(error) {
       console.log(error)
    }   
}