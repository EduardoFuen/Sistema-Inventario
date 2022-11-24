import { PDFDownloadLink, Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'store';
import { FilePdfOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

// project import
import IconButton from 'components/@extended/IconButton';
import Farmu from 'assets/images/home/logoAzulFarmu.png';
import { DATEFORMAT } from 'config';

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
    fontSize: 14,
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
    fontSize: 8,
    margin: 5,
    padding: 5,
    flexGrow: 1,
    width: 110,
    textAlign: 'center'
  }
});
const getProduct = (id: number, data: any) => {
  if (id) {
    let product: any = data?.find((item: any) => item?.ID === id);
    return product;
  }
};

const RenderDocument = ({ data }: any) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Image src={Farmu} style={styles.image} />
        <Text style={styles.header} fixed>
          Fecha {format(new Date(data?.CreatedAt), DATEFORMAT)} # Order Farmu-{data?.ID}
        </Text>
        <Text style={styles.header} fixed>
          Bodega {data?.Warehouse?.Name}
        </Text>
        <Text style={styles.title}>{data?.Supplier?.BusinessName}</Text>
        <Text style={styles.author}>NIT: {data?.Supplier?.Nit}</Text>
        <Text style={styles.author}>Email: {data?.Supplier?.EmailContact}</Text>
        <Text style={styles.author}>Teléfono: {data?.Supplier?.PhoneContact}</Text>
        {data?.Articles && data?.Articles.length > 0 && (
          <Text style={styles.subtitle} x="10" y="30">
            Detalles de Compra
          </Text>
        )}
        {data?.Articles && data?.Articles?.length > 0 && (
          <View style={styles.row}>
            <View style={styles.section}>
              <Text>Producto</Text>
            </View>
            <View style={styles.section}>
              <Text>Cantidad</Text>
            </View>
            <View style={styles.section}>
              <Text>Precio Base</Text>
            </View>
            <View style={styles.section}>
              <Text>IVA</Text>
            </View>
            <View style={styles.section}>
              <Text>Descuento Negociado %</Text>
            </View>
            <View style={styles.section}>
              <Text>Bonificación</Text>
            </View>
            <View style={styles.section}>
              <Text>SubTotal</Text>
            </View>
            <View style={styles.section}>
              <Text>Total</Text>
            </View>
          </View>
        )}
        {data?.Articles &&
          data?.Articles.length > 0 &&
          data?.Articles.map((item: any, index: number) => (
            <View style={styles.row} key={index}>
              <View style={styles.section}>
                <Text>{item?.Name}</Text>
                <Text>{item?.Sku}</Text>
                <Text>{item?.Ean}</Text>
              </View>
              <View style={styles.section}>
                <Text>{item?.Count}</Text>
              </View>
              <View style={styles.section}>
                <Text>$ {item?.BasePrice}</Text>
              </View>
              <View style={styles.section}>
                <Text>{item?.Tax}</Text>
              </View>
              <View style={styles.section}>
                <Text>{item?.Discount}</Text>
              </View>
              <View style={styles.section}>
                <Text>{item?.Bonus}</Text>
              </View>
              <View style={styles.section}>
                <Text>$ {item?.SubTotal}</Text>
              </View>
              <View style={styles.section}>
                <Text>$ {item?.Total}</Text>
              </View>
            </View>
          ))}
        <Text style={styles.summary}>Subtotal: {data?.SubTotal}</Text>
        {data?.Tax > 0 && <Text style={styles.summary}>IVA: {data?.Tax}</Text>}
        <Text style={styles.summary}>Descuento: {data?.Discount}</Text>
        <Text style={styles.summary}>Total: {data?.Total}</Text>
      </Page>
    </Document>
  );
};
interface Props {
  values: any;
  FileName: string;
}

const PDF = ({ values, FileName }: Props) => {
  const theme = useTheme();
  const { products } = useSelector((state) => state.product);

  const newData = {
    ...values,
    Articles: values?.Articles?.map((item: any) => {
      return {
        ...item,
        ID: item?.ProductID,
        Name: getProduct(item.ProductID, products)?.Name,
        Sku: getProduct(item.ProductID, products)?.Sku,
        Ean: getProduct(item.ProductID, products)?.Ean
      };
    })
  };
  return (
    <PDFDownloadLink document={<RenderDocument data={newData} />} fileName={`${FileName}.pdf`}>
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
