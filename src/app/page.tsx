"use client"
import React from 'react'
import { Flex } from '@radix-ui/themes';
import LogInForm from './_components/LogInForm';

function Index() {
  // a página inicial é a de LogIn
  return (
    <Flex direction="column" gap="3" align="center" justify="center"
      style={{
        minHeight: "100vh"
      }}>
        <LogInForm loggedIn={false}/>
    </Flex>

  )
}

export default Index