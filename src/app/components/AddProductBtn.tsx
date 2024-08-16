'use client';
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'

function AddProductBtn() {
  const router = useRouter();
  return (
    <Button variant='contained' color='primary' onClick={()=>router.push('/addproduct')}>
          Add Product
        </Button>
  )
}

export default AddProductBtn