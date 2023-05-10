import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";

import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication, db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import useAuth from "../../hooks/useAuth";

export const useFacebookSignIn = () => {
  const dispatch = useAppDispatch();

  const { login } = useAuth();

  const registerWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(authentication, provider)
      .then(async (credential) => {
        const tokenUser = credential.user.getIdToken();

        login(
          JSON.stringify(tokenUser),
          JSON.stringify(credential.user.refreshToken)
        );

        const userRef = doc(db, "users", credential.user.uid);

        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          console.log("Пользователь уже существует в базе данных.");
        } else {
          await setDoc(userRef, {
            email: credential.user.email,
            displayName:
              credential.user.displayName ||
              "User " + Math.floor(Math.random() * 1000),
            uid: credential.user.uid,
            role: "passenger",
          });
        }

        dispatch(
          setUser({
            isLoggedIn: true,
          })
        );
      })

      .catch((err) => {
        console.log(err.message);
      });
  };
  return registerWithFacebook;
};
