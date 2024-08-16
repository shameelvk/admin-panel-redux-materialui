
import * as React from 'react';;
import { Box, Button, Container, Typography } from '@mui/material';
import ProductDataGrid from '../components/ProductDataGrid';
import { CategorieServices, ProductServices } from '../services/ProductServices';
import AddProductBtn from '../components/AddProductBtn';
import AddCategoriesBtn from '../components/AddCategoriesBtn';
import CategorieDataTable from '../components/CategorieDataTable';

async function AdminCategoriePage() {
  var Categories=await CategorieServices.getCategories()
  console.log(Categories);
  

  return (
    <Container >
      <Box sx={{ display: 'flex', alignItems: 'center', margin: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
        Categories
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> 
        <AddCategoriesBtn/>
        
      </Box>
      
        <CategorieDataTable categories={Categories}/>
     
    </Container>
  );
}

export default AdminCategoriePage;
