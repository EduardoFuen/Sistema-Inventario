import { useMemo } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import CategoryOneForms from './forms/categoryFormOne';
import CategoryTwoForms from './forms/categoryFormTwo';
import CategoryThreeForms from './forms/categoryFormOneThree';
import { useSelector } from 'store';

// types
import { CategoryOne, CategoryTwo, CategoryThree } from 'types/products';

// ==============================|| ADD CATEGORY - MAIN ||============================== //

function AddNewCategories() {
  const { id, index } = useParams();
  const { categoryListOne, categoryListTwo, categoryListThree } = useSelector((state) => state.category);

  const category = useMemo(() => {
    if (id && Number(index) === 0) {
      return categoryListOne.find((item: CategoryOne) => item?.ID === Number(id));
    }
    if (id && Number(index) === 1) {
      return categoryListTwo.find((item: CategoryTwo) => item?.ID === Number(id));
    }
    if (id && Number(index) === 2) {
      return categoryListThree.find((item: CategoryThree) => item?.ID === Number(id));
    }
  }, [categoryListOne, categoryListThree, categoryListTwo, id, index]);

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CategoryOneForms categoryOne={category} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryTwoForms categoryTwo={category} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryThreeForms categoryThree={category} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddNewCategories;
