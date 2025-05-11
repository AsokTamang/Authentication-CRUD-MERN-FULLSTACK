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
  useDisclosure,
  VStack,Input,Button
} from "@chakra-ui/react";
export default function Update() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateStaff,getOnestaff } = useAppStore();
  const [errors, seterrors] = React.useState("");
  const [finalmessage, setfinalmessage] = React.useState("");

  const [updateValue, setupdateValue] = React.useState({
    id: "",
    name: "",
    age: "",
    address: "",
    salary: "",
    contact: "",
  });
  const handlesubmit = async(e) => {
    e.preventDefault();
    const {success,data}=await getOnestaff(updateValue.id);
    if(!success){
     seterrors('Failed to fetch the data.')
     return;
    }

    setupdateValue(data)        //here we are updating the value of updateValue state with the data that we got from our appstore which is provided by our backend that finds using the  id 
    onOpen(); //this code will open the modal box for updating the staff info.
  };
  const handlesubmit2 = async (id, updatedstaff) => {
    const { success, error, message } = await updateStaff(
      id,
      updatedstaff
    );
    if (!success) {
      seterrors(error);
    }
    setfinalmessage(message);
    onClose(); //this helps to close the modalbox.
  };

  return (
    <>
      <div>
        <input
          value={updateValue.id}
          onChange={(e) =>
            setupdateValue({ ...updateValue, id: e.target.value })
          }
          placeholder="Enter an ID value to update the staff info"
        />
        <button onClick={handlesubmit}>Enter</button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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
      </Modal>
      {finalmessage && <p>{finalmessage}</p>}
      {errors && <p>{errors}</p>}
    </>
  );
}
