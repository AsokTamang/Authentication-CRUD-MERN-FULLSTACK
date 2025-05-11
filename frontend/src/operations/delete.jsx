import React from "react";
import { useAppStore } from "../store/appStore.js";
export default function Delete(){
     const [id,setid]=React.useState('');
     const[finalMessage,setfinalMessage]= React.useState('');
     const [errors,seterrors]=React.useState('');
     const {deleteStaff}=useAppStore();
     const handleSubmit=async()=>{
          const{success,message,error}=await deleteStaff(id);
          if(!success){
               seterrors(error);
               return
               
          }
          setfinalMessage(message)
     }




     return(
          <div>
               <input value={id} name="id" type="number" onChange={(e)=>setid(e.target.value)}placeholder="Enter id to delete the staff info" required />
               <button onClick={handleSubmit}>Delete</button>

               {finalMessage && <p>{finalMessage}</p>}
                {errors && <p>{errors}</p>}
          
          </div>
     )
}