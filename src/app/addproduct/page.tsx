'use client';
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, Container, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import BackBtn from '../components/BackBtn';
import { ProductServices } from '../services/ProductServices';
import { AppDispatch } from '@/Redux/store/store';
import { useDispatch } from 'react-redux';
import { addNewProducts } from '@/Redux/slice/product-slice';

const AddProductPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(1); 
  const [image, setImage] = useState<string>('');
  const [productAdd, setProductAdd] = useState<boolean>(false);
  const [productError, setProductError] = useState<{isError: boolean, message: string}>({
    isError: false,
    message: ""
  });
  
  const router = useRouter();

  const handleAddProduct = async () => {
    console.log(title,description,image,price,categoryId);
    
    if (!title || !description || price <= 0 || !image || categoryId <= 0) {
      setProductError({ isError: true, message: 'Please fill all fields correctly' });
      setTimeout(() => {
        setProductError({ isError: false, message: '' });
      }, 3000);
      return;
    }

    const response = await ProductServices.addProduct({title,price,description,categoryId,image})
    

    if (!response.ok) {
        setProductError({ isError: true, message: 'Failed to add product. Please try again.' });
      setTimeout(() => setProductError({ isError: false, message: '' }), 3000);
      return;
    }
    dispatch(addNewProducts(await response.json()))
    
    

    setProductAdd(true);
    setTimeout(() => {
      setProductAdd(false);
      router.push('/products');
    }, 3000);
  };

  return (
    <Container>
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <BackBtn Route={'products'} />
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Add New Product
            </Typography>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              label="Price"
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              margin="normal"
              required
            />
            <TextField
              label="Category ID"
              fullWidth
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
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
                  onClick={handleAddProduct}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {productAdd && (
          <Alert sx={{ position: 'absolute', top: 20, right: 16 }} variant="filled" severity="success">
            Product added successfully
          </Alert> 
        )}
        {productError.isError && (
          <Alert sx={{ position: 'absolute', top: 20, right: 16 }} variant="filled" severity="error">
            {productError.message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AddProductPage;
