import { useMemo } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
// project import
import MainCard from 'components/MainCard';
import CategoryOne from './forms/categoryFormOne';
import CategoryTwo from './forms/categoryFormTwo';
import CategoryThree from './forms/categoryFormOneThree';
import { useSelector } from 'store';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewCategories() {
  const { id } = useParams();
  const { categoryListThree } = useSelector((state) => state.category);

  const category = useMemo(() => {
    if (id) {
      return categoryListThree.find((item) => item?.categoryThree.trim() === id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CategoryOne categoryOne={category?.categoryOne} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryTwo categoryTwo={category?.categoryTwo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryThree categoryThree={category?.categoryThree} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddNewCategories;
