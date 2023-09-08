"use client"
import React from 'react';
import Auth from '../_components/Auth';
import GLBTable from '../_components/GLBTable';

function GLBManager() {
  return (
    <Auth>
        <GLBTable/>
    </Auth>
  )
}

export default GLBManager