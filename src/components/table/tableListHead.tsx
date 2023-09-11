 // material
 import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { FC } from 'react';

// ----------------------------------------------------------------------

interface IListHead {
  order:any,
  orderBy: string,
  rowCount: number,
  headLabel: any,
  numSelected: number,
  onRequestSort: any,
  onSelectAllClick: any
};

const TableListHead:FC<IListHead> = ({
  order,
  orderBy,
  headLabel,
  onRequestSort}) => {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell> */}
        {headLabel.map((headCell:any,index:number) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{width: index === 0 ?  "20px" : "101px"}}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box  >{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableListHead