import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication, db } from "../../../firebase";

import useAuth from "../../hooks/useAuth";

export const PhoneAuthForm = () => {
  const countryCode = "+38";

  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { login } = useAuth();

  const generateRecaptcha = () => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
      },
      authentication
    );
  };

  const requestOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      setExpandForm(true);

      generateRecaptcha();

      let appVerifier = (window as any).recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          (window as any).confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifyOTP = (e: React.FormEvent<HTMLInputElement>) => {
    let otp = e.currentTarget.value;
    setOTP(otp);

    if (otp.length === 6) {
      let confirmationResult = (window as any).confirmationResult;

      confirmationResult
        .confirm(otp)
        .then(async (result: any) => {
          const user = result.user;

          const tokenUser = user.getIdToken();

          login(JSON.stringify(tokenUser), JSON.stringify(user.refreshToken));

          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            console.log("Пользователь уже существует в базе данных.");
          } else {
            await setDoc(userRef, {
              email: user.phoneNumber,
              displayName:
                user.displayName || "User " + Math.floor(Math.random() * 1000),
              uid: user.uid,
              role: "passenger",
            });
          }

          dispatch(
            setUser({
              isLoggedIn: true,
            })
          );

          navigate("/profile/dashboard");
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="formContainer" style={{ width: "500px" }}>
      <form onSubmit={requestOTP}>
        <h1 style={{ textAlign: "center" }}>
          Увійдіть за допомогою номера телефону
        </h1>
        <div className="mb-3">
          <label htmlFor="phoneNumberInput" className="form-label">
            Номер телефону
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumberInput"
            aria-describedby="emailHelp"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div id="phoneNumberHelp" className="form-text">
            Будь ласка, введіть свій номер
          </div>
        </div>
        {expandForm === true ? (
          <>
            <div className="mb-3">
              <label htmlFor="otpInput" className="form-label">
                OTP
              </label>
              <input
                type="number"
                className="form-control"
                id="otpInput"
                value={OTP}
                onChange={verifyOTP}
              />
              <div id="otpHelp" className="form-text">
                Введіть одноразовий PIN-код, надісланий на ваш номер телефону
              </div>
              <NavLink to={"/auth/login"}>повернутися до входу</NavLink>
            </div>
          </>
        ) : null}
        {expandForm === false ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button type="submit" className="btn btn-primary">
              Запит OTP
            </button>
            <NavLink to={"/auth/login"}>повернутися до входу</NavLink>
          </div>
        ) : null}
        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
};
