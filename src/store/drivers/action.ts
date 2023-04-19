import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { Driver } from "../../types";

export const fetchDrivers = createAsyncThunk<
  Driver[],
  undefined,
  {
    rejectValue: string | null | undefined;
  }
>("drivers/fetchDrivers", async (_, { rejectWithValue }) => {
  try {
    const drivers: Driver[] = [];
    const tripsCollectionRef = collection(db, "drivers");
    const querySnapshot = await getDocs(tripsCollectionRef);

    querySnapshot.forEach((doc) => {
      drivers.push({ id: doc.id, ...doc.data() } as Driver);
    });

    return drivers;
  } catch (error: any) {
    return rejectWithValue(error.message || null || undefined);
  }
});
