import { useContext } from 'react'; 
import { Link } from 'react-router-dom'; 
import AuthContext from '../../store/auth-context'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Text from '@mui/material/Text';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn; 

  const logoutHandler = () => {
    authCtx.logout(); 
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Padas Recorder 
            <Link to='/record'>
              Record
            </Link>
          </Typography>
          {!isLoggedIn && (
            <Link to='/auth'>
              Login
            </Link>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavigation; 