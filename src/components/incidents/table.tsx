import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useState, SetStateAction, FC } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Skeleton
} from "@mui/material";

// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import TableListHead from "../table/tableListHead";
import ListToolbar from "../table/tableListToolbar";
import MoreMenu from "../table/TableMoreMenu";
import { AddEditIncident } from "./add-edit-incident";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(
  a: { [x: string]: number },
  b: { [x: string]: number },
  orderBy: string | number
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: any[],
  comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any },
  query: string
) {

  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => 
      _user?.incidentCategory?.toLowerCase().includes(query.toLowerCase())  ||
      _user?.incidentLocation?.toLowerCase().includes(query.toLowerCase())  ||
      _user?.ambulanceType?.toLowerCase().includes(query.toLowerCase())  ||
      _user?.treatmentCenter?.toLowerCase().includes(query.toLowerCase()) ||
      _user?.patientViewModel?.firstName?.toLowerCase().includes(query.toLowerCase()) ||
      _user?.ambulanceViewModel?.name?.toLowerCase().includes(query.toLowerCase()) ||
      _user?.emergencyTreatmentCenterViewModel?.name?.toLowerCase().includes(query.toLowerCase()) 
    );
  }
  return stabilizedThis.map((el: any[]) => el[0]);
}

interface ITable {
  table_Head: any;
  dataList: any;
  page_title: string;
  loading?:boolean,
  fetchAllData:any
}

const CustomTable: FC<ITable> = ({ dataList, page_title, table_Head,loading,fetchAllData }) => {
  const { themeStretch } = useSettings();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState<any>([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(null);

  const toggle = () => {
    setModal(!modal);
    setFormData(null);
    setEdit(false);
  };
  const handleUpdate = (row:any) => {
    setModal(!modal);
    setFormData(row);
    setEdit(true);
  }; 

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

  const handleFilterByName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFilterName(event.target.value);
  };



  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

  const filteredUsers = applySortFilter(
    dataList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0 && !loading;
  let dummyData = [...Array(5)]
  const startIndex = page * rowsPerPage;

  return (
    <>
      <Page title={`${page_title}: List | NEMSAS`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`${page_title}`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `${page_title}`, href:PATH_DASHBOARD.incidents.root },
              { name: "List" },
            ]}
            action={
              <Button
                variant="contained"
                to={
                  PATH_DASHBOARD.incidents.newIncidents
                }
                component={RouterLink}
                startIcon={<Icon icon={plusFill} />}
              >
                New Incident
              </Button>
            }
          />

          <Card>
            <ListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={table_Head}
                    rowCount={dataList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                 { loading ? <TableBody>
                   {dummyData?.map((_dum) =>(
                         <TableRow
                            hover
                      
                            tabIndex={-1}
                            role="checkbox"
                          
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >            
                                <Skeleton variant="rectangular" width={100} height={30} />                               
                              </Stack>
                            </TableCell>
                            <TableCell
                              align="left"
                            >
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                            >
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                            >
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                            >
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                              
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                              
                            >
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                            
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell align="left">
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                              </TableCell>

                            <TableCell align="right"></TableCell>
                          </TableRow>
                   ))}
                  </TableBody> :
                  <TableBody>
                    {filteredUsers
                      .slice(
                        startIndex, startIndex + rowsPerPage
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
                              {startIndex + index + 1}
                           
                            </TableCell>
                            <TableCell
                              align="left"
                             width={150}
                            >
                              { row?.patientViewModel?.firstName ?`${row?.patientViewModel?.firstName } ${row?.patientViewModel?.lastName}` : "Nil"
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                              width={150}
                            >
                              { row?.incidentCategory || "Nil"
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                             
                            >
                               {row?.incidentLocation || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                              
                            >
                               {row?.ambulanceViewModel?.name || "Nil"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                              
                            >
                               {row?.incidentDate || "Nil"
                              }
                            </TableCell>
                            <TableCell align="left"  width={150}>
                          
                              { row?.emergencyTreatmentCenterViewModel?.name || "Nil"}
                             
                              </TableCell>
                            <TableCell align="left">
                          
                              { row?.incidentStatusType || "Nil"}
                             
                              </TableCell>
            
                            <TableCell align="left"  width={150}>
                          
                              { row?.eventStatusType || "Nil"}
                             
                              </TableCell>
            

                            <TableCell align="right">
                                <MoreMenu handleUpdate={handleUpdate} row={row} fetchAllData={fetchAllData} type="incident" url="Incidents/delete" showEdit={row?.eventStatusType === "No Update"} />
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
}
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
        </Container>
      </Page>
      <AddEditIncident toggle={toggle} modal={modal} formData={formData} edit={edit} fetchAllData={fetchAllData}  />
    </>
  );
};

export default CustomTable;
