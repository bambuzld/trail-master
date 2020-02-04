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

const NewPinDrawer = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
      Open
    </Button>
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="lg"
      isFullHeight={false}
      // finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>{/* <Input placeholder="Type here..." /> */}</DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button color="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </>
  );
};

export default NewPinDrawer;
