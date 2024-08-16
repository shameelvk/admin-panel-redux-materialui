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
import { deleteCatgory } from '@/Redux/slice/category-slice';

function DeleteCatDialog({setIsCatDelete,deletecatId,setIsDeleted}:any) {

   const route= useRouter();
   const dispatch = useDispatch<AppDispatch>()
  
    
  const [Dialogopen, setDialogOpen] = useState(true);



    const handleClose=()=>{
        setDialogOpen(false)
        setIsCatDelete(false)

    }

    const handleDeletecategorie = async () => {
       
        
        try {
           dispatch(deleteCatgory(deletecatId))
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
          <Button onClick={() => {handleClose(),handleDeletecategorie()}} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
   </>
  )
}

export default DeleteCatDialog