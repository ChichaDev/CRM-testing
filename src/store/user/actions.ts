// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { doc, getDoc } from "firebase/firestore";
// import { getAuth, signInWithCustomToken } from "firebase/auth";
// import { authentication, db } from "../../../firebase";
// import { setUser } from "./slice";

// export const loadUserData = createAsyncThunk(
//   "@user/loadUserData",
//   async (_, { dispatch }) => {
//     const accessToken = localStorage.getItem("accessToken") || "";
//     console.log("acces", accessToken);

//     const decodedToken = await signInWithCustomToken(
//       authentication,
//       accessToken
//     );
//     const uid = decodedToken.user.uid;

//     const userRef = doc(db, "users", uid);
//     const userSnapshot = await getDoc(userRef);
//     const userData = userSnapshot.data();

//     dispatch(
//       setUser({
//         email: userData?.email,
//         phoneNumber: userData?.phoneNumber,
//         displayName: userData?.displayName,
//         id: uid,
//         isLoggedIn: true,
//       })
//     );
//   }
// );
