import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import { Notification } from "./components/ui/Notification";
import axios from "axios";
import { baseUrl } from "./utils/constants";
import Home from "./components/screens/Home";
import Loader from "./components/ui/Loader";
import Detail from "./components/screens/Detail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const userData = localStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);
      setIsAuthenticated(data.data.authenticationStatus);
    }
    setIsLoading(false);
  }, []);

  const login = async ({ profileObj }) => {
    console.log(profileObj)
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        password: profileObj.googleId,
        username: profileObj.email,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        profilePhoto: profileObj.imageUrl,
      });
      const { data } = response;
      localStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(data.data.authenticationStatus);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Notification />
      {!isLoading ? (
        <BrowserRouter>
          <Routes>
            {
              <>
                <Route
                  path="/"
                  element={
                    !isAuthenticated ? <Login login={login} /> : <Home />
                  }
                />
                <Route
                  path="/user/:id"
                  element={
                    !isAuthenticated ? <Login login={login} /> : <Detail />
                  }
                />
              </>
            }
          </Routes>
        </BrowserRouter>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
