'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const AddCategoriesBtn = () => {
    const router = useRouter();
  return (
    <Button variant='contained' color='primary' onClick={()=>router.push('/addcategorie')}>
    Add Categories
  </Button>
  )
}

export default AddCategoriesBtn

