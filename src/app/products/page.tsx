
import * as React from 'react';;
import { Box, Button, Container, Typography } from '@mui/material';
import ProductDataGrid from '../components/ProductDataGrid';
import { ProductServices } from '../services/ProductServices';
import AddProductBtn from '../components/AddProductBtn';
import { AppDispatch } from '@/Redux/store/store';
import { useDispatch } from 'react-redux';


async function AdminProductsPage() {
  var products=await ProductServices.getProducts()
 
  

  return (
    <Container >
      <Box sx={{ display: 'flex', alignItems: 'center', margin: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> 
        <AddProductBtn/>
        
      </Box>
      
        <ProductDataGrid products={products} />
     
    </Container>
  );
}

export default AdminProductsPage;
