"use client"
import React from 'react'
import Auth from '../_components/Auth'
import { Flex } from '@radix-ui/themes'
import UploadCard from '../_components/UploadCard'

function Home() {
  return (
    <Auth>
        <Flex direction="column" gap="3" align="center" justify="center"
        style={{
          minHeight: "100vh"
        }}>
          <UploadCard/>
        </Flex>
    </Auth>
  )
}

export default Home