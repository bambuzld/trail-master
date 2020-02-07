import React from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/core';

const PopoverComp = ({
  popoverTrigger,
  popoverBody,
  headerText,
  width,
  isOpen,
  onClose
}) => {
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>{popoverTrigger}</PopoverTrigger>
      <PopoverContent zIndex={4} w={width}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{headerText}</PopoverHeader>
        <PopoverBody>{popoverBody}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverComp;
