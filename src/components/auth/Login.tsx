import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(`Пользователь ${user.uid} успешно вошел`);

      localStorage.setItem("currentUser", JSON.stringify(user.refreshToken));

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
          isLoggedIn: true,
        })
      );
    } catch (error) {
      console.error(`Ошибка при входе пользователя: ${error}`);
    }
  };

  return <Form title="Sign In" handleClick={handleLogin} />;
};

export { Login };
