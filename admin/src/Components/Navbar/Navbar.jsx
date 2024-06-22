import '../Navbar/navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; 
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'; 
import Tooltip from '@mui/material/Tooltip';
import {Box} from '@mui/material'
import Logo from '../assets/logo.jpg'
import { useSelector } from 'react-redux';
import Login from '../../pages/Auth/Login/Login';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {logoutAdmin} from '../../Store/authSlice';
import {toggleThemeMode } from '../../Store/themeSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const themeMode = useSelector(state => state.theme.mode);
  const admin = useSelector((state)=>state.auth.admin)
  console.log(admin)
  console.log(admin)


  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
  const handleClose = () => {
    setAnchorEl(null);
  };
  //logout User
  const handleLogout = () => {
    dispatch(logoutAdmin());
    handleClose();
  };
//Theme 

const handleTheme = () => {
dispatch(toggleThemeMode ())
}
const handleFullScreen =()=>{
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }}
return (
    
    <Box className='navbar'>
    
{isAuthenticated ?
     <Box className="wrapper">

        
   <Box className="search">
   <input type='text' placeholder='Search....'/>
  <Tooltip title='Search'><SearchIcon className='icon'/></Tooltip> 
  </Box>
  <Box className="items">
    <Box className="item">
    <Tooltip title='Language'><LanguageIcon className='icon'/> English</Tooltip></Box>
    <Box className="item">
      <Button onClick={handleTheme}>
    {themeMode==='light'?
    'dark'
    :'light'}
    </Button>
    </Box>
    <Box className="item">
    <Tooltip title='Enlarge'><FullscreenIcon className='icon' onClick={handleFullScreen}/></Tooltip>
    </Box>
    <Box className="item">
    <Tooltip title='Notification'><NotificationsIcon className='icon'/></Tooltip>
    <Box className="counter">1</Box>
    </Box>
    <Box className="item">
    <Tooltip title='Chat'><ChatBubbleOutlineIcon className='icon'/></Tooltip>
    <Box className="counter">1</Box>

    </Box>
    <Box className="item">
    <Tooltip title='List'><FormatListBulletedIcon className='icon'/></Tooltip>
    </Box>
    <Box className="item">
    <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >

    <Tooltip title ='User'><img src={Logo} alt="" className='avator' /></Tooltip>
    </Button>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{color:'red'}} >{admin.username}</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout} >Logout</MenuItem>
      </Menu>
    </Box>
  
  </Box>
   </Box>:<Login/>}
  </Box>
  )
}

export default Navbar