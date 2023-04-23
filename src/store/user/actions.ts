import { createAsyncThunk } from "@reduxjs/toolkit";
import { authentication, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../../types";

export const fetchUser = createAsyncThunk<User, void, { rejectValue: Error }>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = authentication.currentUser;
      console.log("user from thunk", user);

      if (!user) {
        return rejectWithValue(new Error("User is not authenticated"));
      }

      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        return rejectWithValue(new Error("User document not found"));
      }

      const userData = userSnapshot.data();
      console.log("user update", userData);

      return {
        id: user.uid,
        displayName: userData.displayName ?? "",
        email: userData.email ?? "",
        phoneNumber: userData.phoneNumber ?? "",
        avatar: user.photoURL ?? "",
        role: userData.role ?? "",
      };
    } catch (err: any) {
      console.error("Failed to fetch user:", err);
      return rejectWithValue(err);
    }
  }
);
