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
import DeleteCatDialog from './DeleteCatDialog';
import EditCatDialog from './EditCatDialog';
import { AppDispatch, RootState } from '@/Redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '@/Redux/slice/category-slice';

function CategorieDataTable({ categories }: any) {

  
  const dispatch = useDispatch<AppDispatch>()

  const [isCatDelete, setIsCatDelete] = useState(false);
  const [deletecatId, setDeletecatId] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  

  const [editCategorie, setEditCategorie] = useState(null);
  const [isCatEdit, setIsCatEdit] = useState(false);
  const [prodEditedMsg, setProdEditedMsg] = useState(false);


  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const listCategory = useSelector((state: RootState) => state.categorys.category)
  
  useEffect(() => {
    dispatch(addCategory(categories))
    if (listCategory) {
      setLoading(false);
    }
  }, []);

  const handleEditClick = (product: any) => {
    setEditCategorie(product);
    setIsCatEdit(true);
  };

  const handleDeleteClick = (id: any) => {
    setIsCatDelete(true);
    setDeletecatId(id);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Images</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
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
            listCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((categorie: any) => (
                <TableRow key={categorie.id}>
                    <TableCell>{categorie.id}</TableCell>
                  <TableCell>{categorie.name}</TableCell>
                  
                 
                  <TableCell >
                    <img
                      src={categorie.image}
                      alt={categorie.name}
                      style={{ width: '10vw' }}
                    />
                  </TableCell>
                  <TableCell>{categorie.creationAt}</TableCell>
                  <TableCell>{categorie.updatedAt}</TableCell>
                  
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(categorie)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(categorie.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
          )}
          {isCatEdit && (
            <EditCatDialog
            setIsCatEdit={setIsCatEdit}
              setProdEditedMsg={setProdEditedMsg}
              editCategorie={editCategorie}
            />
          )}
          {isCatDelete && (
            <DeleteCatDialog
            
            setIsCatDelete={setIsCatDelete}
              deletecatId={deletecatId}
              setIsDeleted={setIsDeleted}
            />
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isDeleted && (
        <Alert
          sx={{ position: 'absolute', top: 2, right: 20 }}
          color="success"
          variant="filled"
        >
          categorie Deleted...
        </Alert>
      )}
      {prodEditedMsg && (
        <Alert
          sx={{ position: 'absolute', top: 2, right: 20 }}
          color="warning"
          variant="filled"
        >
          Product Updated...
        </Alert>
      )}
    </TableContainer>
  );
}

export default CategorieDataTable;
