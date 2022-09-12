import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, InputLabel, MenuItem, Stack, TextField, Typography, FormControlLabel, Switch } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { addCategory, addCategory2, addCategory3 } from 'store/reducers/category';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewCategories() {
  const history = useNavigate();

  const quantities = [
    {
      value: 'one',
      label: '1'
    },
    {
      value: 'two',
      label: '2'
    },
    {
      value: 'three',
      label: '3'
    }
  ];
  const dispatch = useDispatch();

  const [categoryOne, setCategoryOne] = useState('');
  const [categoryOneStatus, setCategoryOneStatus] = useState(false);

  const [categoryTwo, setCategoryTwo] = useState('');
  const [categoryTwoStatus, setCategoryTwotatus] = useState(false);

  const [categoryThree, setCategoryThree] = useState('');
  const [categoryThreeStatus, setCategoryThreetatus] = useState(false);
  const [selectCategoryOne, setSelectCategoryOne] = useState('');
  const [selectCategoryTwo, setSelectCategoryTwo] = useState('');

  const handleCancel = () => {
    history(`/p/product-list`);
  };

  const onSubmitNameCategoryOne = () => {
    const category = {
      name: categoryOne,
      status: categoryOneStatus
    };
    dispatch(addCategory(category));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Categoria add successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };

  const onSubmitNameCategoryTwo = () => {
    const category = {
      name: categoryTwo,
      status: categoryOneStatus
    };
    dispatch(addCategory2(category));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Categoria add successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };
  const onSubmitNameCategoryThree = () => {
    const category = {
      name: categoryThree,
      status: categoryThreeStatus,
      categoryOne: selectCategoryOne,
      categoryTwo: selectCategoryTwo
    };
    dispatch(addCategory3(category));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Categoria add successfully.',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Categoria
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Nombre de Categoria</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Nombre Categoria"
                        onChange={(event) => setCategoryOne(event.target.value)}
                        value={categoryOne}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Estado</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <FormControlLabel
                        control={<Switch sx={{ mt: 0 }} />}
                        onChange={() => setCategoryOneStatus(!categoryOneStatus)}
                        label=""
                        value={categoryOneStatus}
                        labelPlacement="top"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: 'none' }} disabled={!categoryOne} onClick={onSubmitNameCategoryOne}>
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Categoria 2
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Nombre de Categoria 2</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        onChange={(event) => setCategoryTwo(event.target.value)}
                        value={categoryTwo}
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Nombre Categoria 2"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Estado</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <FormControlLabel
                        value={categoryOneStatus}
                        onChange={() => setCategoryTwotatus(!categoryTwoStatus)}
                        control={<Switch sx={{ mt: 0 }} />}
                        label=""
                        labelPlacement="top"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: 'none' }} disabled={!categoryTwo} onClick={onSubmitNameCategoryTwo}>
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Categoria 3
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Nombre de Categoria 3</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Nombre Categoria 3"
                        fullWidth
                        onChange={(event) => setCategoryThree(event.target.value)}
                        value={categoryThree}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Categoria 1</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        placeholder="Categoria 1"
                        fullWidth
                        select
                        value={selectCategoryOne}
                        onChange={(event) => setSelectCategoryOne(event.target.value)}
                      >
                        {quantities.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Categoria 2</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        placeholder="Categoria 2"
                        fullWidth
                        select
                        value={selectCategoryTwo}
                        onChange={(event) => setSelectCategoryTwo(event.target.value)}
                      >
                        {quantities.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>Estado</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <FormControlLabel
                        onChange={() => setCategoryThreetatus(!categoryThreeStatus)}
                        value={categoryThreeStatus}
                        control={<Switch sx={{ mt: 0 }} />}
                        label=""
                        labelPlacement="top"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ textTransform: 'none' }}
                      disabled={!categoryThree}
                      onClick={onSubmitNameCategoryThree}
                    >
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddNewCategories;
