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

// ==============================|| ADD CATEGORY - MAIN ||============================== //

function AddNewCategories() {
  const { id, index } = useParams();
  const { categoryListOne, categoryListTwo, categoryListThree } = useSelector((state) => state.category);

  const category = useMemo(() => {
    if (id && index === '2') {
      return categoryListThree.find((item) => item?.ID === Number(id));
    }
    if (id && index === '1') {
      return categoryListTwo.find((item) => item?.ID === Number(id));
    }
    if (id && index === '0') {
      return categoryListOne.find((item) => item?.ID === Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CategoryOne categoryOne={category} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryTwo categoryTwo={category} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoryThree categoryThree={category} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default AddNewCategories;
