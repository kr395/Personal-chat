import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // user login
  const handleUserLogin = async (e, credentials) => {
     e.preventDefault();
     try {
      
     } catch (error) {
      console.log("handleuserlogin error", error);
     }
  };

  const contextData = {
    user,
    handleUserLogin,
    
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading....</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
