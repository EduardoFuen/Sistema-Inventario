import { useEffect, useState } from 'react';

import * as XLSX from 'xlsx';

interface Props {
  setData: ({ data }: any) => void;
}
const ImportFile = ({ setData }: Props) => {
  const [__html, setHTML] = useState('');

  /* Load sample data once */
  useEffect(() => {
    /* Starting CSV data -- change data here */
    const csv = '';

    /* Parse CSV into a workbook object */
    const wb = XLSX.read(csv, { type: 'string' });

    /* Get the worksheet (default name "Sheet1") */
    const ws = wb.Sheets.Sheet1;

    /* Create HTML table */
    setHTML(XLSX.utils.sheet_to_html(ws, { id: 'tabeller' }));
  }, []);

  return (
    <>
      {/* Import Button */}
      <input
        type="file"
        style={{
          border: '1px solid #ccc',
          display: 'inline-block',
          padding: '6px 12px',
          cursor: 'pointer',
          marginBottom: 20
        }}
        onChange={async (e: any) => {
          /* get data as an ArrayBuffer */
          const file = e.target.files[0];
          const data = await file.arrayBuffer();

          /* parse and load first worksheet */
          const wb = XLSX.read(data);
          const ws = wb.Sheets[wb.SheetNames[0]];
          setHTML(XLSX.utils.sheet_to_html(ws, { id: 'tabeller' }));
          setData(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        }}
      />

      {/* Show HTML preview */}
      <div dangerouslySetInnerHTML={{ __html }} />
    </>
  );
};

export default ImportFile;
