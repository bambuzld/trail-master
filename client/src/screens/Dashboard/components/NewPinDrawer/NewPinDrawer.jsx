import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/core';
import NewPinForm from 'screens/Dashboard/components/NewPinForm'

const NewPinDrawer = ({isOpen}) => {
  const { onClose, onOpen } = useDisclosure();
  return (
    <>
      {/* <Button onClick={onOpen}>
      Open
    </Button> */}
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="sm"
      isFullHeight={false}
      // finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create new pin</DrawerHeader>

        <DrawerBody><NewPinForm/></DrawerBody>

        {/* <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button color="blue">Save</Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
    </>
  );
};

export default NewPinDrawer;
