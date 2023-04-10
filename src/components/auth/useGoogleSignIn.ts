import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const useGoogleSignIn = () => {
  const dispatch = useAppDispatch();

  const auth = getAuth();

  const firestore = getFirestore();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      console.log(user.uid + "выполнил вход через GOOGLE");

      localStorage.setItem("currentUser", JSON.stringify(user.refreshToken));

      const userRef = doc(firestore, "users", user.uid);

      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "user",
        uid: user.uid,
      });

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
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
