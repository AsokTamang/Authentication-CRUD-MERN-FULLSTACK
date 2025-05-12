import React from "react";
import { useAppStore } from "../store/appStore.js";
import { NavLink } from "react-router";
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
,
  Button
} from '@chakra-ui/react'
export default function Delete(){
      const { isOpen, onOpen, onClose } = useDisclosure()
     const [id,setid]=React.useState('');
     const[finalMessage,setfinalMessage]= React.useState('');
     const [errors,seterrors]=React.useState('');
     const {deleteStaff}=useAppStore();
     const handleSubmit=async()=>{
          const{success,message,error}=await deleteStaff(id);
          if(!success){
               seterrors(error);
               onOpen();
               return
               
          }
          setfinalMessage(message)
          setid('');
           onOpen();
     }




     return(
          <div className="operaBox">
               <h1 className="heading">Delete staff info.</h1>
               <input value={id} name="id" type="number" onChange={(e)=>setid(e.target.value)}placeholder="Enter id to delete the staff info" required />
               <button  className="btn1"onClick={handleSubmit}>Delete</button>
               <NavLink className='backbtn' to='/home'>Get back</NavLink>

                {(finalMessage||errors) && <Modal  isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                              <ModalHeader>Delete staff info</ModalHeader>
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
          </div>
     )
}