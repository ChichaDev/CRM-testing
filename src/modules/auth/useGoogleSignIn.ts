import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authentication, db } from "../../../firebase";

import useAuth from "../../hooks/useAuth";

export const useGoogleSignIn = () => {
  const dispatch = useAppDispatch();

  const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(authentication, provider);

      const user = result.user;

      const tokenUser = await user.getIdToken();

      login(JSON.stringify(tokenUser), JSON.stringify(user.refreshToken));

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log("Пользователь уже существует в базе данных.");
      } else {
        await setDoc(userRef, {
          email: user.email,
          displayName:
            user.displayName || "User " + Math.floor(Math.random() * 1000),
          uid: user.uid,
          role: "passenger",
        });
      }

      dispatch(
        setUser({
          isLoggedIn: true,
        })
      );

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  return handleGoogleSignIn;
};
