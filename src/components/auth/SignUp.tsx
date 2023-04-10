import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";
import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const firestore = getFirestore();

  const handleRegister = async (email: string, password: string) => {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        console.log(`Пользователь ${user.uid} успешно зарегистрирован`);

        localStorage.setItem("currentUser", JSON.stringify(user.refreshToken));

        const userRef = doc(firestore, "users", user.uid);

        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || "User",
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

        navigate("/profile");
      })

      .catch((error) => {
        console.error(`Ошибка при регистрации пользователя: ${error}`);
      });
  };

  return <Form title="Sign Up" handleClick={handleRegister} />;
};

export { SignUp };
