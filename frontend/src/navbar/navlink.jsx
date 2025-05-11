import { NavLink } from "react-router"

export default function Navbar(){
    const Style={
        color:'red'
    }
    return(
        <div className="navlink">
         <NavLink style={({isActive})=>isActive?Style:null} to='/'>SignIn</NavLink>
         <NavLink style={({isActive})=>isActive?Style:null} to='/signup'>SignUp</NavLink>
        </div>
    )
}