 import { Icon } from '@iconify/react';
 import { FC, useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
// import trash2Outline from '@iconify/icons-eva/trash-2-outline';
// import toggleIcon from '@iconify/icons-eva/toggle-right-outline'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// routes

// ----------------------------------------------------------------------

interface IMoreMenu {
  handleUpdate?: any,
  row?: any
  fetchAllData?: any,
  type?:string;
  url?:string
};

 const MoreMenu:FC<IMoreMenu> = ({ handleUpdate,row }) =>{
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [modal, setModal] = useState(false);



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
         <MenuItem
          component={RouterLink}
          to=""
           sx={{ color: 'text.secondary' }}
           onClick={()=>handleUpdate(row)}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
    
       
      </Menu>
    </>
  );
}


export default MoreMenu