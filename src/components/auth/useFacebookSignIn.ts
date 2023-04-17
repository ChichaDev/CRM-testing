import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";

export const useFacebookSignIn = () => {
  const dispatch = useAppDispatch();

  const registerWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(authentication, provider)
      .then((credential) => {
        console.log(credential.user.uid + "зарегистрирован");

        localStorage.setItem(
          "refreshToken",
          JSON.stringify(credential.user.refreshToken)
        );

        const userRef = doc(db, "users", credential.user.uid);

        setDoc(userRef, {
          email: credential.user.email,
          displayName: credential.user.displayName || "user",
          uid: credential.user.uid,
        });

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

// const credential = FacebookAuthProvider.credentialFromResult(result);
// const accessToken = credential?.accessToken;

// fetch(
//   `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
// )
//   .then((response) => response.blob())
//   .then((blob) => {
//     console.log("create profile photo FB", URL.createObjectURL(blob));
//   });
