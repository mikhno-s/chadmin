import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';

interface tableData {
  column_names: string[] | undefined;
  rows: any[] | undefined;
}

function ResultTable(data: tableData | undefined) {
  return (
    <Table responsive bordered striped hover variant="dark">
      <thead>
        <tr>
          {data?.column_names && data?.column_names?.map(v => {
            return <th key={v}>{v}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data?.rows && data?.rows?.map((row, index) => {
          return (
            <tr key={index}>
              {
                data?.column_names?.map((column_name: string) => {
                  return (
                    <td key={column_name}>
                      <div className='overflow-scroll' style={{ overflowY: "scroll", maxHeight: "100px" }} >
                        {row[column_name]}
                      </div>
                    </td>
                  )
                })
              }
            </tr>
          )
        })}

      </tbody>
    </Table>
  );
}

export default ResultTable;