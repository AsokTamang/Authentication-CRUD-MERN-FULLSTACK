import React from "react";
import { useAppStore } from "../store/appStore";
export default function Create(){
    const[staff,setstaff]=React.useState({id:'',name:'',age:'',address:'',salary:'',contact:'',})
    const[finalMessage,setfinalMessage]=React.useState('')
     const[errors,seterrors]=React.useState('')
    const{createStaffs}=useAppStore();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {success,data,message,error}=await createStaffs(staff);
        if(!success){
            seterrors(error)

        }
        setfinalMessage(message)
    }
   
    return(
        <form onSubmit={handleSubmit}>
            <input name="id" type="Number" value={staff.id} onChange={(e)=>setstaff({...staff,id:e.target.value})} placeholder="id"/> 
            <br></br>
            <input name="name" type="text" value={staff.name} onChange={(e)=>setstaff({...staff,name:e.target.value})} placeholder="name"/> 
            <br></br>
             <input name="age" type="Number" value={staff.age} onChange={(e)=>setstaff({...staff,age:e.target.value})} placeholder="age"/> 
            <br></br>
            <input name="address" type="text" value={staff.address} onChange={(e)=>setstaff({...staff,address:e.target.value})} placeholder="address"/> 
            <br></br>
              <input name="salary" type="Number" value={staff.salary} onChange={(e)=>setstaff({...staff,salary:e.target.value})} placeholder="salary"/> 
            <br></br>
            <input name="contact" type="Number" value={staff.contact} onChange={(e)=>setstaff({...staff,contact:e.target.value})} placeholder="contact"/> 
            <br></br>
            <button type="submit">Create</button>
            {finalMessage && <p>{finalMessage}</p>}
              {errors && <p>{errors}</p>}
            
            
        </form>
    )
}