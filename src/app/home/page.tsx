"use client"
import React from 'react'
import Auth from '../_components/Auth'
import { Flex } from '@radix-ui/themes'
import UploadCard from '../_components/UploadCard'

function Home() {
  return (
    <Auth>
        <UploadCard/>
    </Auth>
  )
}

export default Home