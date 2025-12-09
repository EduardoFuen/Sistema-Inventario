import { ReactNode, ReactElement, useState, lazy, SyntheticEvent } from 'react';
import Loadable from 'components/Loadable';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

// assets

const PackList = Loadable(lazy(() => import('../apps/pack/pack-list')));
const WarehouseList = Loadable(lazy(() => import('../apps/warehouse/warehouse-list')));
const MakerList = Loadable(lazy(() => import('../apps/maker/maker')));
const TrademarkList = Loadable(lazy(() => import('../apps/trademark/trademark-list')));
const Categories = Loadable(lazy(() => import('../apps/categories/categories-list')));
const TypeProduct = Loadable(lazy(() => import('../apps/typeProduct/typeProduct-list')));
const ActiveSubstances = Loadable(lazy(() => import('../apps/activeSubstances/activeSubstances-list')));
const ProductList = Loadable(lazy(() => import('../apps/product/products-list')));

// ==============================|| TAB ||============================== //

interface TabPanelProps {
  children?: ReactElement | ReactNode | string;
  value: string | number;
  index: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}
function TabProducts() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Lista Productos" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         <ProductList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ActiveSubstances />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TypeProduct />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Categories />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <PackList />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <MakerList />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <TrademarkList />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <WarehouseList />
        </TabPanel>
      </Box>
    </>
  );
}

// ==============================|| PRODUCT - MAIN ||============================== //

const Products = () => {
  return (
    <MainCard content={false}>
      <ScrollX>
        <TabProducts />
      </ScrollX>
    </MainCard>
  );
};

export default Products;
