import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";
import { doc, setDoc } from "firebase/firestore";
import { authentication, db } from "../../../firebase";

export const useGoogleSignIn = () => {
  const dispatch = useAppDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(authentication, provider);

      const user = result.user;
      const tokenUser = await user.getIdToken();

      console.log(user.uid + "выполнил вход через GOOGLE");

      localStorage.setItem("accessToken", JSON.stringify(tokenUser));

      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "user",
        uid: user.uid,
      });

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
