import React from "react";
import { useAppStore } from "../store/appStore.js";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  
  Text,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
export default function Update() {
  const [openModel,setopenModel]=React.useState("")
  
  const { updateStaff, getOnestaff } = useAppStore();
  const [errors, seterrors] = React.useState("");
  const [finalMessage, setfinalmessage] = React.useState("");

  const [updateValue, setupdateValue] = React.useState({
    id: "",
    name: "",
    age: "",
    address: "",
    salary: "",
    contact: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { success, data,error } = await getOnestaff(updateValue.id);
    if (!success) {
      seterrors(error);
     setopenModel("first");   //first is for opening the model box which displays the error.
      return;
    }

    setupdateValue(data); //here we are updating the value of updateValue state with the data that we got from our appstore which is provided by our backend that finds using the  id
    setopenModel("second"); //this code will open the modal box for updating the staff info.
  };
  const handlesubmit2 = async (id, updatedstaff) => {
    const { success, error, message } = await updateStaff(id, updatedstaff);
    if (!success) {
      seterrors(error);
      
    }
    setfinalmessage(message);
    setopenModel("first")    //then this will again show the model box for showing the result of the message.
  };

  const handlesubmit3=()=>{
    setopenModel("");
    setfinalmessage("");
    seterrors("");
  }

  return (
    <>
      <div className="operaBox">
        <h1 className="heading">Update staff info.</h1>
        <input
          value={updateValue.id}
          onChange={(e) =>
            setupdateValue({ ...updateValue, id: e.target.value })
          }
          placeholder="Enter an ID value to update the staff info"
        />

        <button className="btn1" onClick={handlesubmit}>
          Enter
        </button>
        <NavLink className="backbtn" to="/home">
          Get back
        </NavLink>
      </div>
      {openModel==="first" && (
        <Modal isOpen={true} onClose={handlesubmit3}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Result</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">
                {finalMessage || errors}
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handlesubmit3}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {openModel==="second" && <Modal isOpen={true} onClose={handlesubmit3}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update staff info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <Input
                name="name"
                type="text"
                placeholder="name"
                value={updateValue.name}
                onChange={(e) =>
                  setupdateValue({ ...updateValue, name: e.target.value })
                }
              />
              <Input
                name="age"
                type="number"
                placeholder="age"
                value={updateValue.age}
                onChange={(e) =>
                  setupdateValue({ ...updateValue, age: e.target.value })
                }
              />
              <Input
                name="address"
                type="text"
                placeholder="address"
                value={updateValue.address}
                onChange={(e) =>
                  setupdateValue({ ...updateValue, address: e.target.value })
                }
              />
              <Input
                name="salary"
                type="number"
                placeholder="salary"
                value={updateValue.salary}
                onChange={(e) =>
                  setupdateValue({ ...updateValue, salary: e.target.value })
                }
              />
              <Input
                name="contact"
                type="number"
                placeholder="contact"
                value={updateValue.contact}
                onChange={(e) =>
                  setupdateValue({ ...updateValue, contact: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlesubmit3}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => handlesubmit2(updateValue.id, updateValue)}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>}
    </>
  );
}
