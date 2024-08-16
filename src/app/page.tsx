
import React from 'react';
import { Container, Grid, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { redirect, useRouter } from 'next/navigation';
import { CategorieServices, ProductServices } from './services/ProductServices';
import Link from 'next/link';

const AdminHomePage = async() => {
  const products = await ProductServices.getProducts();
        const categories = await CategorieServices.getCategories();
        
 
  return (
    
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Categories</Typography>
            <Typography variant="h4">{categories.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}  >
          <Paper sx={{ p: 2 }}>
            <Typography align='center' variant="h6">Quick Actions</Typography>
            <Link href="/products" >
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Product List
              </Button>
            </Link>
            <Link href={'/categories'}>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} >
            Category List
            </Button>
            </Link>
            <Link href="/addproduct" >
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Add New Product
              </Button>
            </Link>
            <Link href={'/addcategorie'}>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} >
              Add New Category
            </Button>
            </Link>
           
          </Paper>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default AdminHomePage;
