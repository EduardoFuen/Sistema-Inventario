import { useMemo } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import FormOne from './forms/formOne';
import FormTwo from './forms/formTwo';
import FormThree from './forms/formThree';
import { useSelector } from 'store';
// types
import { CategoryOne, CategoryTwo, CategoryThree } from 'types/products';

// ==============================|| ADD CATEGORY - MAIN ||============================== //

function AddNewCategories() {
  const { id, index } = useParams();
  const value = Number(index);
  const ID = Number(id);

  const { categoryListOne, categoryListTwo, categoryListThree } = useSelector((state) => state.category);

  const category: CategoryOne | CategoryTwo | CategoryThree =
    useMemo(() => {
      if (!ID && !value) return;
      let categoryList: CategoryOne[] | CategoryTwo[] | CategoryThree[] = [];
      switch (value) {
        case 0:
          categoryList = categoryListOne;
          break;
        case 1:
          categoryList = categoryListTwo;
          break;
        case 2:
          categoryList = categoryListThree;
          break;
      }
      return categoryList.find((item) => item?.ID === ID);
    }, [value, categoryListOne, ID, categoryListTwo, categoryListThree]) || {};

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormOne data={category} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTwo data={category} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormThree data={category} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddNewCategories;
