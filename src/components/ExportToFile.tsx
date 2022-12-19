// material-ui
import { Button } from '@mui/material';

// third-party
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FILE_TYPE } from 'config';

type Props = {
  excelData: Object[];
  fileName: string;
  title: string;
};

const Export = ({ excelData, fileName, title }: Props) => {
  const fileExtension = '.xlsx';

  const exportToCSV = (excelData: Object[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: FILE_TYPE });

    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Button
      variant="contained"
      onClick={(e) => {
        e.stopPropagation();
        exportToCSV(excelData, fileName);
      }}
    >
      {title}
    </Button>
  );
};
Export.defaultProps = {
  title: 'Exportar'
};

export default Export;
