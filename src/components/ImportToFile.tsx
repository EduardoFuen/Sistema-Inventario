import { useEffect, useState } from 'react';

import * as XLSX from 'xlsx';

interface Props {
  setData: ({ data }: any) => void;
}
const ImportFile = ({ setData }: Props) => {
  const [__html, setHTML] = useState('');
  useEffect(() => {
    const csv = '';

    const wb = XLSX.read(csv, { type: 'string' });
    const ws = wb.Sheets.Sheet1;

    setHTML(XLSX.utils.sheet_to_html(ws, { id: 'tabeller' }));
  }, []);

  return (
    <>
      <input
        type="file"
        style={{
          border: '1px solid #ccc',
          display: 'inline-block',
          padding: '6px 12px',
          cursor: 'pointer',
          marginBottom: 20
        }}
        accept=".xlsx"
        onChange={async (e: any) => {
          const file = e.target.files[0];
          const data = await file.arrayBuffer();

          const wb = XLSX.read(data);
          const ws = wb.Sheets[wb.SheetNames[0]];
          setHTML(XLSX.utils.sheet_to_html(ws, { id: 'tabeller' }));
          setData(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        }}
      />

      <div dangerouslySetInnerHTML={{ __html }} />
    </>
  );
};

export default ImportFile;
