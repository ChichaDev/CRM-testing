import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Driver } from "../../types";
import { User } from "../../types/user";

type DriverType = Pick<Driver, "driver">;

export const fetchUsers = createAsyncThunk("editUsers/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const usersData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as User[];
  return usersData;
});

export const addRole = createAsyncThunk(
  "editUsers/addRole",
  async ({
    userId,
    role,
    displayName,
  }: {
    userId: string;
    role: string;
    displayName: string;
  }) => {
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, { role: role });

    if (role === "driver") {
      const driverRef = collection(db, "drivers");
      const driverData: DriverType = {
        driver: displayName,
      };
      addDoc(driverRef, driverData);
    }
  }
);

export const removeRole = createAsyncThunk(
  "editUsers/removeRole",
  async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { role: null });

      const driverQuerySnapshot = await getDocs(collection(db, "drivers"));
      const promises = driverQuerySnapshot.docs.map(async (docRef) => {
        const driverData = docRef.data();
        const user = await getDoc(doc(db, "users", userId));
        if (driverData.driver === user.data()?.displayName) {
          await deleteDoc(doc(db, "drivers", docRef.id));
        }
      });
      await Promise.all(promises);
    } catch (error) {
      console.log("ERROR", error);
      throw error;
    }
  }
);
