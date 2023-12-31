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
import { formatDateTime } from "../utility";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// function descendingComparator(
//   a: { [x: string]: number },
//   b: { [x: string]: number },
//   orderBy: string | number
// ) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order: string, orderBy: string) {
//   return order === "desc"
//     ? (a: any, b: any) => descendingComparator(a, b, orderBy)
//     : (a: any, b: any) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(
//   array: any[],
//   comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any },
//   query: string
// ) {

//   const stabilizedThis = array?.map((el: any, index: any) => [el, index]);
//   stabilizedThis?.sort((a: number[], b: number[]) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(
//       array,
//       (_user) => _user?.drugName?.toLowerCase().includes(query.toLowerCase()) 
     
//     );
//   }
//   return stabilizedThis.map((el: any[]) => el[0]);
// }

interface ITable {
  table_Head: any;
  dataList: any;
  page_title: string;
  loading?:boolean,
  fetchAllUsers:any;
  type?:string
}

const CustomUsableTable2: FC<ITable> = ({ dataList, table_Head,loading }) => {
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

  // const filteredUsers = applySortFilter(
  //   dataList,
  //   getComparator(order, orderBy),
  //   filterName
  // );

  const isUserNotFound = dataList?.length === 0 && !loading;

  return (
    <>
      
          <Card sx={{ p: 3,mb:2}}>
          <Box sx={{mb:2}}>Medical Interventions By Ambulance</Box>
            {/* <ListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            /> */}

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
                              align="center"
                             
                            >
                              { index + 1
                              }
                           
                            </TableCell>
                           
                            <TableCell
                              align="left"
                             
                            >
                              { row?.bloodPressure || "Nil"
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.canSpeak ? "Yes" : "No" 
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.glucose || "Nil"
                              }
                            </TableCell>
                           
                            <TableCell
                              align="left"
                             
                            >
                               {row?.isInPain  ? "Yes" : "No" 
                              }
                            </TableCell>
                           
                            <TableCell
                              align="left"
                             
                            >
                               {row?.isAlert  ? "Yes" : "No" 
                              }
                            </TableCell>
                           
                            {/* <TableCell
                              align="left"
                             
                            >
                               {row?.mainComplaint || "Nil"
                              }
                            </TableCell> */}
                            <TableCell
                              align="left"
                             
                            >
                               {row?.oxygen || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.pulse || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.resp || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             width={200}
                            >
                               {row?.sizeOfFluid || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             width={200}
                            >
                               {row?.ivFluidType || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             width={200}
                            >
                               {row?.totalIvFluidVolumeGiven || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             width={200}
                            >
                               {row?.locationOfIvInfusion || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.sp02 || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.unResponsive ? "Yes" : "No"
                              }
                            </TableCell>
                           
                  
                           
                            
                            <TableCell align="left">
                          
                           {formatDateTime(row?.dateAdded) || "Nil"}
                             
                              </TableCell>
                              <TableCell
                              align="left"
                             
                            >
                              { row?.mediicalIntervention || "Nil"
                              }
                           
                            </TableCell>
                            <TableCell align="left">
                          
                           {row?.remarks || "Nil"}
                             
                              </TableCell>
                            <TableCell align="left">
                          
                           {row?.notes || "Nil"}
                             
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

export default CustomUsableTable2;
