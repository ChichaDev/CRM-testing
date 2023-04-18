import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getUserInfo } from "../../store/user/selector";
import { fetchUser } from "../../store/user/actions";

export const ProfileCard = () => {
  const dispatch = useAppDispatch();

  const { email, phoneNumber, displayName } = useAppSelector(getUserInfo);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h2>Welcome, {displayName}!</h2>
        <p>Your email is {email}.</p>

        <h2>{phoneNumber || "not number"}</h2>
      </div>
    </div>
  );
};
