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

  const category: any = useMemo(() => {
    if (ID && value === 0) {
      return categoryListOne.find((item: CategoryOne) => item?.ID === ID);
    }
    if (ID && value === 1) {
      return categoryListTwo.find((item: CategoryTwo) => item?.ID === ID);
    }
    if (ID && value === 2) {
      return categoryListThree.find((item: CategoryThree) => item?.ID === ID);
    }
  }, [value, categoryListOne, ID, categoryListTwo, categoryListThree]);

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
