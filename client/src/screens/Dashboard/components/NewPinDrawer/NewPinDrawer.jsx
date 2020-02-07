import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/core';
import NewPinForm from 'screens/Dashboard/components/NewPinForm';

const NewPinDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
        isFullHeight={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new pin</DrawerHeader>

          <DrawerBody>
            <NewPinForm onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NewPinDrawer;
