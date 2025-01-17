// project import
import SimpleBar from '@dashboard/_components/third-party/SimpleBar';
import Navigation from './Navigation';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
    {/* <NavCard /> */}
  </SimpleBar>
);

export default DrawerContent;
