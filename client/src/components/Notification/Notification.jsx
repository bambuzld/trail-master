import React,{useEffect} from 'react';

import { useToast } from '@chakra-ui/core';

const Notification = ({ status, text, duration }) => {
  const toast  = useToast();
  useEffect(() => {
    toast({
      title: status,
      description: text,
      status,
      duration,
      isClosable: true,
      position: "bottom-left",
      boxShadow: "none"
    });
    return () => {};
  }, []);
  return <></>;
};

export default Notification;
