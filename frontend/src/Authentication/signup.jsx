import React from "react";
import { useAppStore } from "../store/appStore.js";
import Navbar from "../navbar/navlink.jsx";
import { useNavigate } from "react-router";
export default function Signup() {
  const navigate = useNavigate();
  const [user, setuser] = React.useState({ name: "", email: "", password: "" });
  const [finalMessage, setfinalMessage] = React.useState("");
  const [errors, seterrors] = React.useState("");
  const { signUp } = useAppStore(); //here we are destructuring the function signIn from our zusatnd store

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message, error } = await signUp(user.name,user.email,user.password); //here we are using await to use user in our signIn function.
      if (success) {
        setfinalMessage(message); //here if there is no error from our backend then we set the message responded by our backend in our ui state

        navigate("/"); //here after the successful login we are naviagting to our  signin route
      } else {
        seterrors(error); //here if there is  error from our backend then we set the errors responded by our backend in our ui state
      }
    } catch (Err) {
      console.error(Err);
    }
  };
  return (
    <>
    <Navbar/>
    <div className="signBOX">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setuser({ ...user, name: e.target.value })}
        />
        <br></br>
        <input
          name="email"
          type="email"
          placeholder="📧 Enter your email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
        />
        <br></br>
        <input
          name="password"
          type="password"
          placeholder="🔒 Enter your password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
        <br></br>
        <button className="btn" type="submit">Sign Up</button>
      </form>
      {errors && <p>{errors}</p>}
    </div>
    </>
  );
}
