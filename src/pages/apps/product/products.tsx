import { ReactNode, useState, lazy } from 'react';
import Loadable from 'components/Loadable';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

// assets

const PackList = Loadable(lazy(() => import('../pack/pack-list')));
const WarehouseList = Loadable(lazy(() => import('../warehouse/warehouse-list')));
const ProductList = Loadable(lazy(() => import('./products-list')));
const MakerList = Loadable(lazy(() => import('../maker/maker')));
const TrademarkList = Loadable(lazy(() => import('../trademaker/trademaker-list')));
const Categories = Loadable(lazy(() => import('../categories/categories-list')));

// ==============================|| REACT TAB ||============================== //

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
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
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Lista Productos" {...a11yProps(0)} />
            <Tab label="Categorias" {...a11yProps(1)} />
            <Tab label="Envase" {...a11yProps(2)} />
            <Tab label="Maker" {...a11yProps(3)} />
            <Tab label="Trademark" {...a11yProps(4)} />
            <Tab label="Bodegas" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ProductList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Categories />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PackList />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MakerList />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TrademarkList />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <WarehouseList />
        </TabPanel>
      </Box>
    </>
  );
}

// ==============================|| PRODUCT LIST - MAIN ||============================== //

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
