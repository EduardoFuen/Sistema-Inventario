import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../MainCard';

// assets
import { ApartmentOutlined, HomeOutlined, HomeFilled } from '@ant-design/icons';

// types
import { OverrideIcon } from 'types/root';
import { NavItemType } from 'types/menu';

// ==============================|| BREADCRUMBS ||============================== //

export interface BreadCrumbSxProps extends CSSProperties {
  mb?: string;
  bgcolor?: string;
}

interface Props {
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation?: { items: NavItemType[] };
  rightAlign?: boolean;
  separator?: OverrideIcon;
  title?: boolean;
  titleBottom?: boolean;
  sx?: BreadCrumbSxProps;
}

const Breadcrumbs = ({
  card,
  divider = true,
  icon,
  icons,
  maxItems,
  navigation,
  rightAlign,
  separator,
  title,
  titleBottom,
  sx,
  ...others
}: Props) => {
  const theme = useTheme();
  const location = useLocation();
  const [main, setMain] = useState<NavItemType | undefined>();
  const [item, setItem] = useState<NavItemType>();
  const { id, index } = useParams();

  const iconSX = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };

  useEffect(() => {
    navigation?.items?.map((menu: NavItemType, index: number) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu as { children: NavItemType[]; type?: string });
      }
      return false;
    });
  });

  // set active item state
  const getCollapse = (menu: NavItemType) => {
    if (menu.children) {
      menu.children.filter((collapse: NavItemType | any) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse as { children: NavItemType[]; type?: string });
        } else if (collapse.type && collapse.type === 'item') {
          let url: string | undefined;
          let newUrl: string | undefined;
          if (id !== undefined) {
            if (index) {
              url = collapse.url.slice(0, collapse.url?.indexOf('/:id/'));
              newUrl = `${url}/${id}/${index}`;
            } else {
              url = collapse.url.slice(0, collapse.url.lastIndexOf('/'));
              newUrl = `${url}/${id}`;
            }
          }
          if (location.pathname === collapse.url || location.pathname === newUrl) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  // item separator
  const SeparatorIcon = separator!;
  const separatorIcon = separator ? <SeparatorIcon style={{ fontSize: '0.75rem', marginTop: 2 }} /> : '/';

  let mainContent;
  let itemContent;
  let breadcrumbContent: ReactElement = <Typography />;
  let itemTitle: NavItemType['title'] = '';
  let itemUrl: NavItemType['mainUrl'];
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (main && main.type === 'collapse') {
    CollapseIcon = main.icon ? main.icon : ApartmentOutlined;
    mainContent = (
      <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
        {icons && <CollapseIcon style={iconSX} />}
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title;
    ItemIcon = item.icon ? item.icon : ApartmentOutlined;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    );
    if (item && item.type === 'item' && item.hide) {
      ItemIcon = item.icon ? item.icon : ApartmentOutlined;
      itemTitle = item.mainTitle;
      itemUrl = item.mainUrl;
      mainContent = (
        <Typography component={Link} to={itemUrl || ''} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
          {icons && <ItemIcon style={iconSX} />}
          {itemTitle}
        </Typography>
      );
    }
    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={card === false ? { mb: 3, bgcolor: 'transparent', ...sx } : { mb: 3, ...sx }}
          {...others}
          content={card}
          shadow="none"
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={1}
          >
            {title && !titleBottom && (
              <Grid item>
                <Typography variant="h2">{item.title}</Typography>
              </Grid>
            )}
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  {icons && <HomeOutlined style={iconSX} />}
                  {icon && !icons && <HomeFilled style={{ ...iconSX, marginRight: 0 }} />}
                  {(!icon || icons) && 'Home'}
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && titleBottom && (
              <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
                <Typography variant="h2">{item.title}</Typography>
              </Grid>
            )}
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
