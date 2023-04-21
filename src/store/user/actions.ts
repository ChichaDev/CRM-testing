import { createAsyncThunk } from "@reduxjs/toolkit";
import { authentication, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../../types";

export const fetchUser = createAsyncThunk<User, void, { rejectValue: Error }>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = authentication.currentUser;

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
        displayName: userData.displayName ?? "",
        email: userData.email ?? "",
        phoneNumber: userData.phoneNumber ?? "",
        avatar: user.photoURL ?? "",
      };
    } catch (err: any) {
      console.error("Failed to fetch user:", err);
      return rejectWithValue(err);
    }
  }
);

// export const fetchUserRole = createAsyncThunk<
//   string,
//   void,
//   { rejectValue: { message: string } }
// >("user/fetchUserRole", async (_, { rejectWithValue }) => {
//   console.log("THUNK work");
//   const user = authentication.currentUser;
//   console.log("USER from thunk", user);
//   if (!user) {
//     return rejectWithValue({ message: "User is not authenticated" });
//   }
//   const userDoc = doc(db, "users", user.uid);
//   const userSnapshot = await getDoc(userDoc);
//   if (!userSnapshot.exists()) {
//     return rejectWithValue(new Error("User document not found"));
//   }

//   const userData = userSnapshot.data();
//   if (!userData) {
//     return rejectWithValue(new Error("User data not found"));
//   }

//   const role = userData.role || "";
//   return role;
// });
