  import { Stack,Box, TextField,Button, Typography, Paper, Modal } from "@mui/material"
  import { useState} from "react";
  import FoodBankIcon from '@mui/icons-material/FoodBank';
  import { useDispatch} from "react-redux";
  import { loginAdmin } from "../../../Store/authSlice";
  import { Link } from "react-router-dom";

  const Login = () => {
  
    const[userData,setUserData]=useState({username:'',password:''})
    const [open, setOpen] = useState(true);

    console.log(userData)
  const dispatch = useDispatch();
  const handleClose = () => setOpen(true);

   const handlechange=(e)=>{
    e.preventDefault();
    setUserData({...userData,[e.target.name]:e.target.value})
    }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(userData)
  dispatch(loginAdmin(userData));
}

return (
    
    <Stack sx={{display:'flex',flexdirection:'column',alignItems:'center',
    bgcolor: 'background.paper'}}>
      <Modal 
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
      >
      <Paper sx={{gap:'20px',textAlign:'center',marginTop:'20px',alignItems:'center',
        position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:400,
        bgcolor:'background.paper',border:'2px solid #000',boxShadow:24,p:4,
      }}>
        <form method="post" onSubmit={handleSubmit}>
        <Typography sx={{fontWeight:'bold',color:'orange',fontSize:'28px',marginBottom:'20px'}}>
        <FoodBankIcon sx={{marginRight:'10px',color:'orange'}}/>Login</Typography>
      <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
      <TextField name="username" value={FormData.username} onChange={handlechange} id="outlined-basic" label="Username" variant="outlined" />
      <TextField name="password" value={FormData.password} onChange={handlechange} id="outlined-basic" label="Password" variant="outlined" />
      <Button type="submit" variant="contained" sx={{bgcolor:'orange'}}>Login</Button>
      </Box>
      </form>
     <Box> <Link to='/forgetpassword'>Forget Password ?</Link> </Box>
      </Paper>
      </Modal>
      </Stack>
  )
}

export default Login