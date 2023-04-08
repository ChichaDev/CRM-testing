import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";

const Login = () => {
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
    } catch (error) {
      console.error(`Ошибка при входе пользователя: ${error}`);
    }
  };

  return <Form title="Sign In" handleClick={handleLogin} />;
};

export { Login };
