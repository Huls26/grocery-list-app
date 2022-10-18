import {
    db,
    user,
} from "../index"
import {
    getDocs,
} from "firebase/firestore"

export async function getList() {
    const snapshot = await getDocs(user);

    return snapshot.docs
}