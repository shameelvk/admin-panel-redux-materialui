import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { CategorieServices } from '../services/ProductServices';
import { AppDispatch } from '@/Redux/store/store';
import { useDispatch } from 'react-redux';
import { editCategorys } from '@/Redux/slice/category-slice';

const EditCatDialog = ({ editCategorie, setProdEditedMsg, setIsCatEdit }: any) => {
  
  const dispatch = useDispatch<AppDispatch>()
  const route = useRouter();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState<string>('');

  useEffect(() => {
   
    setName(editCategorie.name); 
  }, [editCategorie]);

  const handleClose = () => {
    setOpen(false);
    setIsCatEdit(false);
  };

  const handleEditCategory = async () => {
    if (!name) {
      alert('Please enter a category name!');
      return;
    }else{
        let cat=await CategorieServices.updateCategorie({ id: editCategorie.id, name })
        dispatch(editCategorys(cat))
        setProdEditedMsg(true);
        setTimeout(() => {
          setProdEditedMsg(false);
        }, 4000);
        handleClose();
        route.refresh();
    }

  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditCategory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCatDialog;
