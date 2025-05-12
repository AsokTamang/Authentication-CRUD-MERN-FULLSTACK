import React from "react";
import Navbar from "../navbar/navlink.jsx";
import { useAppStore } from "../store/appStore.js";
import { useNavigate,NavLink } from "react-router";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
export default function Signin() {
  const navigate = useNavigate();
  const [user, setuser] = React.useState({ email: "", password: "" });
  const [finalMessage, setfinalMessage] = React.useState("");
  const [errors, seterrors] = React.useState("");
  const { signIn } = useAppStore(); //here we are destructuring the function signIn from our zusatnd store

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message, error } = await signIn(user.email,user.password); //here we are using await to use user in our signIn function.
      if (success) {
        setfinalMessage(message); //here if there is no error from our backend then we set the message responded by our backend in our ui state
        navigate("/home"); //here after the successful login we are naviagting to our  home route
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
        <span>Email</span>
        <br></br>
        <div className="sameline">
        <MdOutlineMail className="icon"/>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
        />
        </div>
        <br></br>
         <span>Password</span>
        <br></br>
        <div className="sameline">
        <RiLockPasswordLine className="icon"/>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
        </div>
        <br></br>
        <button className="btn" type="submit">Login</button>
      </form>
      {errors && <><p className="error">{errors}</p>
      <NavLink className="btn"to='/signup'>Sign Up?</NavLink> </>}
    </div>
    </>
  );
}
