'use client';
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, Container, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import BackBtn from '../components/BackBtn';
import { CategorieServices } from '../services/ProductServices';
import { addNewCategory } from '@/Redux/slice/category-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store/store';

const AddCategoryPage = () => {
  
  const dispatch = useDispatch<AppDispatch>()


  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [categoryAdd, setCategoryAdd] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<{ isError: boolean, message: string }>({
    isError: false,
    message: ""
  });

  const router = useRouter();

  const handleAddCategory = async () => {
    if (!name || !image) {
      setCategoryError({ isError: true, message: 'Please fill all fields correctly' });
      setTimeout(() => {
        setCategoryError({ isError: false, message: '' });
      }, 3000);
      return;
    }

    try {
      const response =await CategorieServices.addcategory({name,image})

      if (!response.ok) {
        setCategoryError({ isError: true, message: 'Failed to add category. Please try again.' });
        setTimeout(() => setCategoryError({ isError: false, message: '' }), 3000);
        return; }

        dispatch(addNewCategory(await response.json()))
    

      setCategoryAdd(true);
      setTimeout(() => {
        setCategoryAdd(false);
        router.push('/categories');
      }, 3000);
    } catch (error) {
      console.error('Error adding category:', error);
      setCategoryError({ isError: true, message: 'Failed to add category. Please try again.' });
      setTimeout(() => setCategoryError({ isError: false, message: '' }), 3000);
    }
  };

  return (
    <Container>
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <BackBtn Route={'categories'} />
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Add New Category
            </Typography>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Image URL"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
              margin="normal"
              required
            />
            <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddCategory}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {categoryAdd && (
          <Alert sx={{ position: 'absolute', top: 20, right: 16 }} variant="filled" severity="success">
            Category added successfully
          </Alert> 
        )}
        {categoryError.isError && (
          <Alert sx={{ position: 'absolute', top: 20, right: 16 }} variant="filled" severity="error">
            {categoryError.message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AddCategoryPage;
