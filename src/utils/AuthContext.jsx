import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnload();
  }, []);
  // check if user is logged in
  const getUserOnload = async () => {
    try {
      const userDetails = await account.get();
      console.log("GET USER ONLOAD", userDetails);
      setUser(userDetails);
    } catch (error) {
      // console.log("GET USER ONLOAD ERROR", error);
    }
    setLoading(false);
  };

  // user login
  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    try {
      const response = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      console.log("handleuserlogin response", response);
      const userDetails = await account.get();
      setUser(userDetails);
      navigate("/");
    } catch (error) {
      // console.log("handleuserlogin error", error);
      alert("Invalid email or password");
    }
  };

  // user logout
  const handleUserLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("handleuserlogout error", error);
    }
  };

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();
    if (credentials.password1 !== credentials.password2) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      )
      await account.createEmailPasswordSession(credentials.email, credentials.password1);
      const userDetails = await account.get();
      setUser(userDetails);
      navigate("/");

    } catch (error) {
      console.log ("HANDLE USER REGISTER ERROR", error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading....</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
