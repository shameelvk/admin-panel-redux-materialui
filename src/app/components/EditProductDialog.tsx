'use client';
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { ProductServices } from '../services/ProductServices';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/Redux/store/store';
import { useDispatch } from 'react-redux';
import { editProducts } from '@/Redux/slice/product-slice';

const EditProductDialog = ({ setIsProductEdit, setProdEditedMsg, editProduct }:any) => {

  const dispatch = useDispatch<AppDispatch>()
   const route= useRouter();
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  useEffect( () => {
    
   setTitle(editProduct.title)
   setPrice(editProduct.price)
   setDescription(editProduct.description)
    
   
  }, [editProduct]);

  const handleClose = () => {
    setOpen(false);
    setIsProductEdit(false);
  };

  const handleEditProduct = async () => {
    if (!title || price <= 0 || !description) {
      alert('Please fill all fields !!');
    } else {
      const p= await ProductServices.updateProduct({id: editProduct.id,
        title,
        price,
        description,})
        console.log(p);
        
        dispatch(editProducts(p))
        
        
      setProdEditedMsg(true);
      setTimeout(() => {
        setProdEditedMsg(false);
      }, 4000);
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProductDialog;
