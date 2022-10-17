import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRowCustom from './components/TableRow';

import './CurrenciesTable.css'
import {useEffect} from "react";

interface Column {
  id: 'position' | 'type' | 'currency' | 'fiat' | 'amount';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'position', label: 'Позиция', minWidth: 50 },
  { id: 'type', label: 'Cделка', minWidth: 125 },
  { id: 'currency', label: 'Крипта', minWidth: 100,},
  {id: 'fiat', label: 'Фиат', minWidth: 100 },
  {id: 'amount', label: 'Сумма', minWidth: 150, align: 'right' },
];

interface Data {
  id: string;
  position: string;
  type: string;
  currency: string;
  fiat: string;
  amount: number;
}

function createData(
  id: string,
  position: string,
  type: string,
  currency: string,
  fiat: string,
  amount: number,
): Data {
  return { id, position, type, currency, fiat, amount };
}

const rows = [
  createData( '1', 'A6', 'BUY', 'USDT', 'RUB', 100000),
  createData('2', 'D6', 'BUY', 'USDT', 'IDR', 10000000),
];

export default function CurrenciesTable() {
  const [list, setList] = React.useState([]);

  useEffect(() => {
    setList(rows)
  }, [])

  const handleDeleteItem = (id) => {
    setList(list => list.filter(i => i.id !== id))
  }

  return (
    <div className='currencies-table'>
      <h3>{list.length ? 'Активные ячейки' : 'Нет активных трекеров цены'}</h3>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {list.length ? (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {list.map((row, index) => {
                  return (
                    <TableRowCustom
                      key={index}
                      row={row}
                      columns={columns}
                      handleDeleteItem={handleDeleteItem}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Paper>
    </div>
  );
}
