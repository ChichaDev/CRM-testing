import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication, db } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/redux-hook";
import { setUser } from "../../store/user/slice";
import { doc, setDoc } from "firebase/firestore";

export const PhoneAuthForm = () => {
  const countryCode = "+38";

  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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
      console.log(otp);
      let confirmationResult = (window as any).confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result: any) => {
          const user = result.user;
          console.log(user);
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(user.refreshToken)
          );

          const userRef = doc(db, "users", user.uid);

          setDoc(userRef, {
            email: user.phoneNumber,
            displayName: user.displayName || "user",
            uid: user.uid,
          });

          dispatch(
            setUser({
              isLoggedIn: true,
            })
          );

          navigate("/tripspage");
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="formContainer" style={{ width: "500px" }}>
      <form onSubmit={requestOTP}>
        <h1>Sign in with phone number</h1>
        <div className="mb-3">
          <label htmlFor="phoneNumberInput" className="form-label">
            Phone Number
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
            Please enter your number
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
                Please enter the one time pin sent to your phone number
              </div>
              <Link to={"/login"}>
                <h6>back to login</h6>
              </Link>
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
              Request OTP
            </button>
            <Link to={"/login"}>
              <h6>back to login</h6>
            </Link>
          </div>
        ) : null}
        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
};
