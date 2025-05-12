import {create} from 'zustand'

export const useAppStore=create((set,get)=>({
    user:null,  //here we are setting the user information null at first
    token:localStorage.getItem('token')||null,    //here we are setting the token  null at first or if there is token in the localStorage then we get the token from there.
    
    //AUTHENTICATION OPERATION
    signUp:async(name,email,password)=>{
        if(!name||!email||!password){
            return{success:false,error:'Please enter all fields'}
        }
        try{
            const res=await fetch('/api/mern/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,password})
            });
            const data=await res.json();
            if(!res.ok){
                return {success:false,error:data.message}
            }
            if(!data.success){
               return {success:false,error:data.message}
            }
            localStorage.setItem('token',data.token)  //here we are setting the token in a localstorage provided by our backend
            set({user:data.user,token:data.token})     //then we are setting the user information and token in our zusatnd states.
            return{success:true,data:data.user,token:data.token,message:'Signed up successfully'}




        }
        catch(Err){
            console.error(Err.message)
        }

    },
    signIn:async(email,password)=>{
         if(!email||!password){
            return{success:false,error:'Please enter all fields'}
        }
        try{
            const res=await fetch('/api/mern/signin',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
            });
           
            const data=await res.json();
            if(!res.ok){
                return {success:false,error:data.message}
            }
            if(!data.success){
               return {success:false,error:data.message}
            }
            localStorage.setItem('token',data.token)  //here we are setting the token in a localstorage provided by our backend
            set({user:data.user,token:data.token})     //then we are setting the user information and token in our zusatnd states.
            return{success:true,data:data.user,token:data.token,message:'Logged in successfully'}


        }
        catch(Err){
            console.error(Err.message)
        }

    },
    signOut:async()=>{
        localStorage.removeItem('token');   //here we are removing the token from our localstorage.
        set({user:null,token:null})         //we are also removing every information of user as well as of token from our zustand states.
    },

    // THIS PART IS ABOUT STAFFS CRUD OPERATIONS!
    staffs:[],

    getStaffs:async()=>{
        try{
            const res=await fetch('/api/mern/staff',{
                method:'GET',
                 headers:{
                    'Authorization':`Bearer ${get().token}`,
                     }   //here we are setting the Authorization to Bearer tokenvalue of our zustand store.
              
            });
            const data=await res.json();
             if(!data.success){
               return {success:false,error:data.message}
            }
             if(!res.ok){
                return {success:false,error:data.message}
            }
            set({staffs:data.data})   //here we are setting the retrieved total number of staffs in our staffs state.
            return ({success:true,data:data.data,message:'Retrieved successfully'})

        }
        catch(Err){
            console.error(Err.message);
        }
    },
    createStaffs:async(newStaff)=>{
        if(!newStaff.id||!newStaff.name||!newStaff.age||!newStaff.address||!newStaff.salary||!newStaff.contact){
            return({success:false,message:'Please enter all the fields.'})
        }
        try{
            const res=await fetch('/api/mern/staff',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${get().token}`
                },
                body:JSON.stringify(newStaff)
            });
            const data=await res.json();
             if(!data.success){
               return {success:false,error:data.message}
            }
             if(!res.ok){
                return {success:false,error:data.message}
            }
            set({staffs:[...get().staffs,data.data]})   //here we are appending the data provided by the response from our backend in our zustand staffs state.
            return ({success:true,data:data.data,message:'Staff info created successfully'})
        }
        catch(Err){
            console.error(Err.message)
        }
    },
    updateStaff:async(id,updatedStaff)=>{
         if(!updatedStaff.id||!updatedStaff.name||!updatedStaff.age||!updatedStaff.address||!updatedStaff.salary||!updatedStaff.contact){
            return({success:false,message:'Please enter all the fields.'})
        }

        try{
            const res=await fetch(`/api/mern/staff/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${get().token}`
                },
                body:JSON.stringify(updatedStaff)
            });
            const data=await res.json();
             if(!data.success){
               return {success:false,error:data.message}
            }
             if(!res.ok){
                return {success:false,error:data.message}
            }
            set({staffs:get().staffs.map((staff)=>staff.id===id?data.data:staff)})
            return ({success:true,data:data.data,message:'Staff info updated successfully'})

        }
        catch(Err){
            console.error(Err.message)
        }
    },
    deleteStaff:async(id)=>{
        

        try{
            const res=await fetch(`/api/mern/staff/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${get().token}`
                }
                
            });
            const data=await res.json();
             if(!data.success){
               return {success:false,error:data.message}
            }
             if(!res.ok){
                return {success:false,error:data.message}
            }
            set({staffs:get().staffs.filter((staff)=>staff.id!==id)})
            return ({success:true,data:data.data,message:'Staff info deleted successfully'})

        }
        catch(Err){
            console.error(Err.message)
        }
    },
    getOnestaff:async(id)=>{
        try{
            const res=await fetch(`/api/mern/staff/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                    ,'Authorization':`Bearer ${get().token}`
                }

            });
            const data=await res.json();
             if(!data.success){
               return {success:false,error:data.message}
            }
             if(!res.ok){
                return {success:false,error:data.message}
            }
            return ({success:true,data:data.data,message:'Staff info with this id retrieved successfully. '})


        }
        catch(Err){
            console.error(Err.message)
        }
    }





}))