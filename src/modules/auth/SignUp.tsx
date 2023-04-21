import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";
import { Form } from "./Form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { authentication, db } from "../../../firebase";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(authentication, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        console.log(`Пользователь ${user.uid} успешно зарегистрирован`);

        const tokenUser = await user.getIdToken();

        localStorage.setItem("accessToken", JSON.stringify(tokenUser));
        localStorage.setItem("refreshToken", JSON.stringify(user.refreshToken));

        const userRef = doc(db, "users", user.uid);

        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || "User",
          uid: user.uid,
          role: "passenger",
        });

        dispatch(
          setUser({
            isLoggedIn: true,
          })
        );

        navigate("/tripspage");
      })

      .catch((error) => {
        console.error(`Ошибка при регистрации пользователя: ${error}`);
      });
  };

  return <Form title="Sign Up" handleClick={handleRegister} />;
};

export { SignUp };
