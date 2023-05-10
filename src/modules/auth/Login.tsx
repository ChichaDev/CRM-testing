import { Form } from "./Form";

import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";

import { authentication } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const dispatch = useAppDispatch();

  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );

      const user = userCredential.user;

      const tokenUser = await user.getIdToken();

      login(JSON.stringify(tokenUser), JSON.stringify(user.refreshToken));

      dispatch(
        setUser({
          isLoggedIn: true,
        })
      );
    } catch (error) {
      console.error(`Ошибка при входе пользователя: ${error}`);
    }
  };

  return <Form title="Увійти" handleClick={handleLogin} />;
};

export { Login };
