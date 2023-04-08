import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Пользователь ${user.uid} успешно зарегистрирован`);
      })
      .catch((error) => {
        console.error(`Ошибка при регистрации пользователя: ${error}`);
      });
  };

  return <Form title="Sign Up" handleClick={handleRegister} />;
};

export { SignUp };
