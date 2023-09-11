 import { Icon } from '@iconify/react';
 import { FC, useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { useNavigate} from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Remove } from '../serviceproviders/components/delete';
// routes

// ----------------------------------------------------------------------

interface IMoreMenu {
  handleUpdate?: any,
  row?: any
  fetchAllData?: any,
  type?:string;
  url?:string
  param?:string
  options?:any
  showEdit?:boolean
};

 const MoreMenu:FC<IMoreMenu> = ({ handleUpdate,row,type, param="id" ,fetchAllData,url,options,showEdit=true}) =>{
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  let navigate = useNavigate();
  const toggle = () => {
    setModal(!modal);

  };
  const handleView = () =>{
    if(type === "ambulance"){
      navigate(PATH_DASHBOARD.claims.viewAmbulance,{state:{row}})
    }else if(type === "patient"){
      navigate(PATH_DASHBOARD.patients.viewPatient,{state:{row,options}})
    }
    else if (type === "incident"){
      navigate(PATH_DASHBOARD.incidents.viewIncident,{state:{row}})
    } else if(type === "etc") {
      navigate(PATH_DASHBOARD.claims.viewEtc,{state:{row}})
    }
  }

  const handleEdit = () =>{
    if (type === "incident"){
      navigate(PATH_DASHBOARD.incidents.newIncidents,{state:{row}})
    } else if(type === "runsheets"){
      navigate(PATH_DASHBOARD.ambulance_run_sheets.viewRunSheet,{state:{data:row}})

    }
    else{
      handleUpdate(row)
    }
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
     {(type === "ambulance" || type === "etc" || type === "patient"  || type === "incident" ) &&   <MenuItem

           sx={{ color: 'text.secondary' }}
           onClick={()=>handleView()}
        >
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>}
    
        { ( type !== "etc"&& type !== "ambulance"  && showEdit) && <MenuItem
           sx={{ color: 'text.secondary' }}
           onClick={() =>handleEdit()}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>}
       {(type === "Services"  || type ==="User" ) && <MenuItem onClick={toggle}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>}     
      </Menu>
      <Remove modal={modal} toggle={toggle} fetchData={fetchAllData} id={row?.id} param={param} url={url} type={type} />

    </>
  );
}


export default MoreMenu