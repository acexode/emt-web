// import { filter } from "lodash";
import { useState, SetStateAction, FC } from "react";
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Box,
  
} from "@mui/material";

// routes
// hooks
// components
import Scrollbar from "./Scrollbar";
import SearchNotFound from "./SearchNotFound";
import TableListHead from "./table/tableListHead";
// import ListToolbar from "./table/tableListToolbar";
import { formatDate2, formatter } from "../utility";


interface ITable {
  table_Head: any;
  dataList: any;
  page_title: string;
  loading?:boolean,
  fetchAllUsers:any;
  type?:string
}

const CustomUsableTable: FC<ITable> = ({ dataList, table_Head,loading }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState<any>([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, _setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleRequestSort = (_event: any, property: SetStateAction<string>) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: { target: { checked: any } }) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n: any) => n?.location?.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (_event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList?.length) : 0;

  const isUserNotFound = dataList?.length === 0 && !loading;

  return (
    <>
      
          <Card sx={{ p: 3,mb:2}}>
          <Box sx={{mb:2}}>ETC Treatment</Box>
          

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={table_Head}
                    rowCount={dataList?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                
                  <TableBody>
                    {dataList
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any, index: number) => {
                        const isItemSelected =
                          selected.indexOf(row?.year) !== -1;

                        return (
                          <TableRow
                            hover
                            key={index}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                          
                            <TableCell
                              align="left"
                             
                            >
                              { index + 1
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                              { row?.drug?.description || "Nil"
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                              { row?.dose === 0 ? "Procedure" : "Drug" 
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                              { row?.drug?.code || "Nil"
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.quantity
                              }
                            </TableCell>
                            <TableCell
                              align="right"
                             
                            >
                               {row?.dose 
                              }
                            </TableCell>
                           
                  
                           
                            {/* <TableCell align="left">
                          
                              { formatter.format(row?.drug?.price ?? 0)}
                             
                              </TableCell> */}
                            <TableCell align="left">
                          
                              { formatter.format(row?.price ?? 0)}
                             
                              </TableCell>
                            <TableCell align="left">
                          
                           {formatDate2(row?.dateAdded) || "Nil"}
                             
                              </TableCell>
                        

                        
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {(isUserNotFound) && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
       
    </>
  );
};

export default CustomUsableTable;
