import React from "react";
import { useAppStore } from "../store/appStore";
import { NavLink } from "react-router";
import Navbar from "../navbar/navlink";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text

  ,Button
} from '@chakra-ui/react'

export default function Create(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[staff,setstaff]=React.useState({id:'',name:'',age:'',address:'',salary:'',contact:'',})
    const[finalMessage,setfinalMessage]=React.useState('')
     const[errors,seterrors]=React.useState('')
    const{createStaffs}=useAppStore();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {success,data,message,error}=await createStaffs(staff);
        if(!success){
            seterrors(error)
            onOpen();

        }
        setfinalMessage(message)
        setstaff({id:'',name:'',age:'',address:'',salary:'',contact:'',})
        onOpen();
    }
   
    return(
        <>
        <Navbar/>
        <form className="operaBox" onSubmit={handleSubmit}>
             <h1 className="heading">Create staff info.</h1>
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
            <button  className="btn1" type="submit">Create</button>
            <br></br>
            <NavLink className='backbtn' to='/home'>Get back</NavLink>
            
            
        </form>
        {(finalMessage||errors) && <Modal  isOpen={isOpen} onClose={onClose}>
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>Create staff info.</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                  <Text fontWeight='bold' mb='1rem'>
                                    {finalMessage||errors}
                                  </Text>
                                </ModalBody>
                      
                                <ModalFooter>
                                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                  </Button>
                                  
                                </ModalFooter>
                              </ModalContent>
                            </Modal>}
        </>
    )
}