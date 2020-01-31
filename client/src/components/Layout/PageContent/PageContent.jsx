import React from 'react'
import {Flex} from '@chakra-ui/core'

const PageContent = ({children, direction, align, justify}) => {
  return (
    <Flex direction={direction} justify={justify} align={align} height="100vh">
      {children}
    </Flex>
  )

}


export default PageContent