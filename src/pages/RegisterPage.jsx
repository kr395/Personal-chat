import React,{useState} from 'react'
import { useAuth } from "../utils/AuthContext"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const { user, handleUserRegister } = useAuth();
  const [credentials, setCredentials] = useState({ name: "", email: "", password1: "", password2: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    // console.log(credentials);
  };

  return (
    <div className="auth--container">
    <div className="from--wrapper">
      <form onSubmit={(e) => handleUserRegister(e, credentials)}>
      <div className="field--wrapper">
          <label>Name:</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Enter Your Name."
            value={credentials.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="field--wrapper">
          <label>Email:</label>
          <input
            type="email"
            required
            name="email"
            placeholder="Enter Your Email."
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="field--wrapper">
          <label>Password:</label>
          <input
            type="password"
            required
            name="password1"
            placeholder="Enter Password."
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="field--wrapper">
          <label>Confirm Password:</label>
          <input
            type="password"
            required
            name="password2"
            placeholder="Confirm Your Password."
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="field--wrapper">
            <input className="btn btn--lg btn--main" type="submit" value="Login" />
        </div>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>

  </div>
  )
}

export default RegisterPage