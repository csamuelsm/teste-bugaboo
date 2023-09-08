"use client"
import React from 'react'
import Auth from '../../_components/Auth'
import Viewer from '../../_components/Viewer'
import { Flex } from '@radix-ui/themes'
import { useParams } from 'next/navigation'

function GLBViewer() {

  const params = useParams();

  function getGlbFile() {
    if (Array.isArray(params.glb_file)) {
      return params.glb_file[0];
    } else {
      return params.glb_file;
    }
  }

  return (
    <Auth>
        <Flex direction="column" gap="3" align="center" justify="center">
            <Viewer
            glb_file={getGlbFile()}
            />
        </Flex>
    </Auth>
  )
}

export default GLBViewer