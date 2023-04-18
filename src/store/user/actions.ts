import { createAsyncThunk } from "@reduxjs/toolkit";
import { authentication, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

type UserA = {
  email?: string;
  phoneNumber?: string;
  id: string;
  displayName?: string;
  // avatar?: string;
};

export const fetchUser = createAsyncThunk<UserA, void, { rejectValue: Error }>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = authentication.currentUser;
      console.log("USER", user);

      if (!user) {
        return rejectWithValue(new Error("User is not authenticated"));
      }

      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        return rejectWithValue(new Error("User document not found"));
      }

      const userData = userSnapshot.data();

      return {
        id: user.uid,
        displayName: userData?.displayName ?? "",
        email: userData?.email ?? "",
        phoneNumber: userData?.phoneNumber ?? "",
        // avatar: userData.photoURL ?? "",
      };
    } catch (err: any) {
      console.error("Failed to fetch user:", err);
      return rejectWithValue(err);
    }
  }
);
