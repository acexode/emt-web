import { useContext } from 'react';
import { CollapseDrawerContext } from '../context/collapseDrawer.context';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
