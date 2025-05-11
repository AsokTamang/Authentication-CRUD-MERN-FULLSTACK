import React from "react";
import { useAppStore } from "../store/appStore";
import Navbar from "../navbar/navlink";
import { NavLink } from "react-router";
export default function Get(){
     const{getStaffs,staffs}=useAppStore();
    React.useEffect(()=>{
        getStaffs();   //here we are calling the getStaffs function which fetch the the total number of staffs from our api.

    },[])
    const totalStaffs=staffs.map((staff)=>
        <tbody>
            <tr>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.age}</td>
                <td>{staff.address}</td>
                <td>{staff.salary}</td>
                <td>{staff.contact}</td>
            </tr>
        </tbody>
    )
    return(
        <>
        <Navbar/>
       <div className="operaBox">
       <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Age</td>
                <td>Address</td>
                <td>Salary</td>
                <td>Contact</td>
            </tr>

        </thead>
        {totalStaffs}
       </table>
       <br></br>
       <NavLink className='backbtn' to='/home'>Get back</NavLink>
       </div>
       </>
    )

}