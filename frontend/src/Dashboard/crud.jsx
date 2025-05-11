import React from "react";
import { NavLink } from "react-router";
import Navbar from "../navbar/navlink";
export default function Home(){
    
    return(
        <>
        <Navbar/>
        <div className="admin">
        <h1 className="heading">Admin Dashboard</h1>
        <hr></hr>
        <main className="crud">
        <NavLink className="nav" to='/get'>Get Staff info.</NavLink>
        <NavLink className="nav" to='/create'>Create Staff info.</NavLink>
        <NavLink className="nav" to='/update'>Update Staff info.</NavLink>
        <NavLink className="nav" to='/delete'>Delete Staff info.</NavLink>
        </main>
        </div>
        
        </>
        
    )
}