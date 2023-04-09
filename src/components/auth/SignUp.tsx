import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";
import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(`Пользователь ${user.uid} успешно зарегистрирован`);

        localStorage.setItem("currentUser", JSON.stringify(user.refreshToken));

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
      })

      .catch((error) => {
        console.error(`Ошибка при регистрации пользователя: ${error}`);
      });
  };

  return <Form title="Sign Up" handleClick={handleRegister} />;
};

export { SignUp };
