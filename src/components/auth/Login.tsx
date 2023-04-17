import { Form } from "./Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";
import { authentication } from "../../../firebase";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );

      const user = userCredential.user;

      console.log(`Пользователь ${user.uid} успешно вошел`);

      localStorage.setItem("refreshToken", JSON.stringify(user.refreshToken));

      dispatch(
        setUser({
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
