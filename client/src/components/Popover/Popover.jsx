import React, {useState} from 'react'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button
  } from '@chakra-ui/core';
  

const PopoverComp = ({popoverTrigger,popoverBody,headerText, width, isOpen,onClose}) => {
    console.log('popoverTrigger', popoverTrigger);
    const [open,setOpen] = useState(isOpen)
    return (
        <Popover  isOpen={isOpen} onClose={onClose}>
              <PopoverTrigger>
                 {popoverTrigger}
              </PopoverTrigger>
              <PopoverContent zIndex={4} w={width}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>{headerText}</PopoverHeader>
                <PopoverBody>
                  {popoverBody}
                </PopoverBody>
              </PopoverContent>
            </Popover>
    )
}

export default PopoverComp