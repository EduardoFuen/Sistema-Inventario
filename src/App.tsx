// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';

// auth provider
import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
import { FilterProvider } from 'contexts/FilterContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <FilterProvider>
      <RTLLayout>
        <Locales>
          <ScrollTop>
            <AuthProvider>
              <>
                <Routes />
                <Snackbar />
              </>
            </AuthProvider>
          </ScrollTop>
        </Locales>
      </RTLLayout>
    </FilterProvider>
  </ThemeCustomization>
);

export default App;
