import React, { useEffect, useState } from "react";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import { defaultRouter } from "./routing/routing";
import { fetchUser } from "./store/user/actions";
import { authentication } from "../firebase";

function App() {
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        await store.dispatch(fetchUser());
      }
      setUserLoaded(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!userLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={defaultRouter} />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
