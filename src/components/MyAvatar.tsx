// hooks
// @ts-nocheck

import { MAvatar } from './@material-extend';
import createAvatar from '../utility/createAvatar';
import { useAuthUserContext } from '../context/authUser.context';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const {userState:{userProfile}}  = useAuthUserContext()
    return (
    
    <MAvatar
      src={""}
      alt={userProfile?.name}
    
      // color={ createAvatar(userProfile?.name).color}
      {...other}
    >
      {createAvatar(userProfile?.name).name}
    </MAvatar>
  );
}
