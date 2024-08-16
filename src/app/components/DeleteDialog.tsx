import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { redirect, useRouter } from 'next/navigation';
import { ProductServices } from '../services/ProductServices';
import { AppDispatch } from '@/Redux/store/store';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/Redux/slice/product-slice';

function DeleteDialog({setIsProductDelete,deletePrdId,setIsDeleted,setIsReload}:any) {

   const route= useRouter();
   const dispatch = useDispatch<AppDispatch>()

   
    
  const [Dialogopen, setDialogOpen] = useState(true);



    const handleClose=()=>{
        setDialogOpen(false)
        setIsProductDelete(false)

    }

    const handleDeleteProduct = async () => {
        try {
          const response = dispatch(deleteProduct(deletePrdId))
          console.log(response);
      
          
         route.refresh()
          setIsDeleted(true);
          setTimeout(() => {
            setIsDeleted(false);
          }, 3000);
          handleClose(); 
        } catch (error) {
          console.error('Error deleting product:', error);
          
        }
      };

    
    
   
  return (
   <>
    <Dialog
        open={Dialogopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {handleClose(),handleDeleteProduct()}} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
   </>
  )
}

export default DeleteDialog