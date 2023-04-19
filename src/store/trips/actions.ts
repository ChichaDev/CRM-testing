import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../../firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Trips } from "../../types";

export const fetchTrips = createAsyncThunk<
  Trips[],
  undefined,
  {
    rejectValue: string | null | undefined;
  }
>("trips/fetchTrips", async (_, { rejectWithValue }) => {
  try {
    const trips: Trips[] = [];
    const tripsCollectionRef = collection(db, "trips");
    const querySnapshot = await getDocs(tripsCollectionRef);

    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() } as Trips);
    });

    return trips;
  } catch (error: any) {
    return rejectWithValue(error.message || null || undefined);
  }
});

export const deleteTrip = createAsyncThunk<void, string>(
  "@trips/deleteTrip",
  async (tripId: string) => {
    await deleteDoc(doc(db, "trips", tripId));
  }
);
