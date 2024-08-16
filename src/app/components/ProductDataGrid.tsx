'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TablePagination,
  Box,
  Alert,
} from '@mui/material';
import DeleteDialog from './DeleteDialog';
import EditProductDialog from './EditProductDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store/store';
import { addProduct } from '@/Redux/slice/product-slice';


function ProductDataGrid({products}:any) {
 const [isProductDelete, setIsProductDelete] = useState(false)
 const [isProductEdit, setIsProductEdit] = useState(false)
 const [deletePrdId, setDeletePrdId] = useState('')
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleted, setIsDeleted] = useState(false)
  const [isReload, setIsReload] = useState('')
 const [prodEditedMsg, setProdEditedMsg] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const dispatch = useDispatch<AppDispatch>()
  const listproducts = useSelector((state: RootState) => state.products.product)
   console.log(listproducts);
   

  useEffect(() => {
    dispatch(addProduct(products))
    
    
    if(listproducts){
      setLoading(false)
    }
   
  }, []);

 
  const handleEditClick = (product:any) => {
    setEditProduct(product);
    setIsProductEdit(true);
   
  };

  const handleDeleteClick = (id:any) => {
    setIsProductDelete(true)
    setDeletePrdId(id)
  };

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Images</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            listproducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product:any) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description.slice(0,50)}</TableCell>
                <TableCell>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    style={{ width: '100%', height: 'auto',  }}
                  />
                </TableCell>
                <TableCell>{product.creationAt}</TableCell>
                <TableCell>{product.updatedAt}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>
                <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
          {
        isProductEdit&&<EditProductDialog
        setIsProductEdit={setIsProductEdit}
        setProdEditedMsg={setProdEditedMsg}
        editProduct={editProduct}
        
        
      />
      }
          {isProductDelete&&<DeleteDialog setIsReload={setIsReload} setIsProductDelete={setIsProductDelete} deletePrdId={deletePrdId} setIsDeleted={setIsDeleted}/>}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {
        isDeleted&&<Alert sx={{position:"absolute" ,top:2,right:20}} color='success' variant='filled'>Product Deleted...</Alert>
      }
      {
        prodEditedMsg&&<Alert sx={{position:"absolute" ,top:2,right:20}} color='warning' variant='filled'>Product Updated...</Alert>
      }
      
    </TableContainer>
  );
}

export default ProductDataGrid;
