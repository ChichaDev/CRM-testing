import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../../../firebase";

export const useFacebookSignIn = () => {
  const registerWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log(result.user.uid + "зарегистрирован");
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
