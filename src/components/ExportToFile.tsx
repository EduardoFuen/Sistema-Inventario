// material-ui
import { Button } from '@mui/material';

// third-party
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FILE_TYPE } from 'config';

/**
 * It takes an array of objects and a file name, converts the array to a workbook, converts the
 * workbook to a blob, and then saves the blob to the user's computer
 * @param {Props}  - excelData - the data you want to export
 * @returns A function that returns a button
 */

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
