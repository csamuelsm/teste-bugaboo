"use client"
import React from 'react'
import { Flex } from '@radix-ui/themes';
import SignUpForm from '../_components/SignUpForm';

function Index() {
  return (
    <Flex direction="column" gap="3" align="center" justify="center"
      style={{
        minHeight: "100vh"
      }}>
        <SignUpForm/>
    </Flex>

  )
}

export default Index