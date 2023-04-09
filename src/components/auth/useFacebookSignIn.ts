// вход через FACEBOOK
const registerWithFacebook = async () => {
  const auth = getAuth();

  const facebookProvider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, facebookProvider);

    const user = result.user;
    console.log(user.uid + "был зарегестрирован через FACEBOOK");

    return user;
  } catch (error) {
    if (error === "auth/popup-closed-by-user") {
      alert(
        "Вы закрыли окно авторизации. Пожалуйста, повторите попытку авторизации."
      );
    } else {
      alert(
        "Произошла ошибка авторизации. Пожалуйста, попробуйте еще раз позже."
      );
    }
  }
};
