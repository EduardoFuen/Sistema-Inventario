import { PDFDownloadLink, Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import { useTheme } from '@mui/material/styles';

import { FilePdfOutlined } from '@ant-design/icons';

// project import
import IconButton from 'components/@extended/IconButton';
import Farmu from 'assets/images/home/logoAzulFarmu.png';

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 15,
    textAlign: 'center'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8
  },
  summary: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 8,
    fontWeight: 600
  },
  subtitle: {
    fontSize: 12,
    margin: 12,
    fontWeight: 600
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },
  image: {
    textAlign: 'center',
    width: 90
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  page: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  section: {
    fontSize: 12,
    margin: 5,
    padding: 5,
    flexGrow: 1,
    width: 110
  }
});

const RenderDocument = ({ data }: any) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Image src={Farmu} style={styles.image} />
        <Text style={styles.header} fixed>
          Fecha {data?.create_order} # Order {data?.ID}
        </Text>
        <Text style={styles.header} fixed>
          Bodega {data?.warehouse}
        </Text>
        <Text style={styles.title}>{data?.supplier?.BusinessName}</Text>
        <Text style={styles.author}>NIT: {data?.supplier?.Nit}</Text>
        <Text style={styles.author}>Email: {data?.supplier?.EmailContact}</Text>
        <Text style={styles.author}>Teléfono: {data?.supplier?.PhoneContact}</Text>

        {data?.Articles.length > 0 && <Text style={styles.subtitle}>Detalles de Compra</Text>}
        {data?.Articles.length > 0 && (
          <View style={styles.row}>
            <View style={styles.section}>
              <Text>Producto</Text>
            </View>
            <View style={styles.section}>
              <Text>Precio Base</Text>
            </View>
            <View style={styles.section}>
              <Text>Cantidad</Text>
            </View>
            <View style={styles.section}>
              <Text>Subtotal</Text>
            </View>
          </View>
        )}

        {data?.Articles.length > 0 &&
          data?.Articles.map((item: any, index: number) => (
            <View style={styles.row} key={index}>
              <View style={styles.section}>
                <Text>{item?.Name}</Text>
                <Text>SKU{item?.Sku}</Text>
              </View>
              <View style={styles.section}>
                <Text>{item?.BasePrice}</Text>
              </View>
              <View style={styles.section}>
                <Text>{item?.Count}</Text>
              </View>
              <View style={styles.section}>
                <Text>{item?.Count * item?.BasePrice}</Text>
              </View>
            </View>
          ))}
        <Text style={styles.summary}>Subtotal: {data?.subtotal}</Text>
        {data?.tax !== '' && <Text style={styles.summary}>IVA: {data?.tax}</Text>}
        {data?.discount !== '' && <Text style={styles.summary}>Descuento: {data?.discount}</Text>}
        <Text style={styles.summary}>Total: {data?.total}</Text>
      </Page>
    </Document>
  );
};

const PDF = ({ values }: any) => {
  const theme = useTheme();
  return (
    <PDFDownloadLink document={<RenderDocument data={values} />} fileName="purchase.pdf">
      {({ loading }) =>
        loading ? (
          ''
        ) : (
          <IconButton color="primary">
            <FilePdfOutlined twoToneColor={theme.palette.primary.main} />
          </IconButton>
        )
      }
    </PDFDownloadLink>
  );
};

export default PDF;
