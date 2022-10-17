import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TableRowCustom = ({ columns, row, handleDeleteItem }) => {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [values, setValue] = React.useState({
    position: '',
    type: '',
    currency: '',
    fiat: '',
    amount: '',
  });


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = ({ target }) => {
    setValue(val => ({ ...val, [target.name]: target.value }))
  }

  const renderEditor = (type, val) => {
    const value = values[type] || val

    switch (type) {
      case 'position':
        return (
          <TextField
            size='small'
            value={value}
            onChange={handleChange}
            variant="outlined"
            name='position'
            label='Позиция'
            disabled={!isEdit}
          />
        )
      case 'type':
        return (
          <FormControl fullWidth disabled={!isEdit}>
            {/*<InputLabel>Сделка</InputLabel>*/}
            <Select
              size='small'
              value={value}
              onChange={handleChange}
              name='type'
            >
              <MenuItem value='BUY'>Покупка</MenuItem>
              <MenuItem value='SELL'>Продажа</MenuItem>
            </Select>
          </FormControl>
        )
      case 'currency':
        return (
          <FormControl fullWidth disabled={!isEdit}>
            {/*<InputLabel id='currency-label'>Крипта</InputLabel>*/}
            <Select
              labelId="currency-label"
              id="currency-select"
              size='small'
              value={value}
              onChange={handleChange}
              name='currency'
            >
              <MenuItem value='USDT'>USDT</MenuItem>
              <MenuItem value='BUSD'>BUSD</MenuItem>
            </Select>
          </FormControl>
        )
      case 'fiat':
        return (
          <FormControl fullWidth disabled={!isEdit}>
            {/*<InputLabel>Фиат</InputLabel>*/}
            <Select
              size='small'
              value={value}
              onChange={handleChange}
              name='fiat'
            >
              <MenuItem value='RUB'>RUB</MenuItem>
              <MenuItem value='IDR'>IDR</MenuItem>
            </Select>
          </FormControl>
        )
      case 'amount':
        return (
          <TextField
            id="outlined-basic"
            size='small'
            value={value}
            onChange={handleChange}
            variant="outlined"
            name='amount'
            label='Сумма'
            disabled={!isEdit}
          />
        )
      default:
        return <div>123</div>
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontSize={18}>
          {"Удалить трекер цены?"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size='small' sx={{ marginRight: '16px' }}>Отмена</Button>
          <Button onClick={() => {
            handleDeleteItem(row.id)
            handleClose()
          }} size='small' autoFocus variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      <TableRow hover role="checkbox" tabIndex={-1}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {renderEditor(column.id, value)}
            </TableCell>
          );
        })}
        <TableCell align='center'>
          <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex' }}>
            {isEdit ? (
              <SaveOutlinedIcon fontSize="small" onClick={() => setEdit(false)} />
            ) : <EditOutlinedIcon fontSize="small" onClick={() => setEdit(true)} />}
            <DeleteOutlinedIcon fontSize="small" onClick={handleOpen} />
          </Box>
        </TableCell>
      </TableRow>
    </>
  )
}

export default TableRowCustom
