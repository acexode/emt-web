import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { useTheme } from '@mui/material/styles';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Menu,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  TableContainer
} from '@mui/material';
// utils
 //
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const MOCK_INVOICES = [
  {
    id: 1,
    transaction_date: '7/31/2021',
    transaction_title: 'CHARACTER CERTIFICATE',
    fileNumber: 'CC17670',
    requestType: 'Police Extract',
    status: 'Paid'
  },
  {
    id: 2,
    transaction_date: '5/31/2021',
    transaction_title: 'EXTRACT SERVICE',
    fileNumber: 'EXT37004',
    requestType: 'Police Extract',
    status: 'Pending'
  },
  {
    id: 3,
    transaction_date: '10/12/2021',
    transaction_title: ' ESCORT SERVICE',
    fileNumber: 'ES485848',
    requestType: 'Police Extract',
    status: 'Paid'
  },
  {
    id: 4,
    transaction_date: '12/20/2021',
    transaction_title: 'EXTRACT SERVICE',
    fileNumber: 'EXT31829',
    requestType: 'Police Extract',
    status: 'Declined'
  },
  {
    id: 5,
    transaction_date: '6/8/2021',
    transaction_title: ' ESCORT SERVICE',
    fileNumber: 'ES22755',
    requestType: 'Police Extract',
    status: 'Pending'
  }
];

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem>
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={printerFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={shareFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={archiveFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Archive
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem sx={{ color: 'error.main' }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function SettlementReportTable() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Service Requests" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>REQUEST DATE</TableCell>
                <TableCell>SERVICE TYPE</TableCell>
                <TableCell>FILE NUMBER</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`${row.transaction_date}`}</TableCell>
                  <TableCell>{row.transaction_title}</TableCell>
                  <TableCell>{row.fileNumber}</TableCell>
                  <TableCell>
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'pending' && 'warning') || (row.status === 'rejected' && 'error') || 'success'
                      }
                    >
                      {row.status}
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
