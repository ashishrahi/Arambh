import { Stack,Box, TextField,Button, Typography, Paper, Modal } from "@mui/material"
import { useState } from "react";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { useDispatch } from "react-redux";
import {registerAdmin} from "../../../Store/authSlice";
const Register = () => {

const dispatch = useDispatch();

const [open, setOpen] = useState(true);
const[formData,setFormData] = useState({username:'',password:'',email:''});
console.log(formData);
const handleClose = () => setOpen(true);
const handlechange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit = async(e) => {
    e.preventDefault()
dispatch(registerAdmin(formData));
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
    <Paper sx={{textAlign:'center',marginTop:'20px',alignItems:'center',
      position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:400,
      bgcolor:'background.paper',border:'2px solid #000',boxShadow:24,p:4,
    }}>
        <form method="post" onSubmit={handleSubmit}>
    <Typography sx={{fontWeight:'bold',color:'orange',fontSize:'28px',marginBottom:'20px'}}>
    <FoodBankIcon sx={{marginRight:'10px',color:'orange'}}/>Register</Typography>
    
    <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
    <TextField name="username" value={FormData.username} onChange={handlechange} id="outlined-basic" label="Username" variant="outlined" />
    <TextField name="email" value={FormData.email} onChange={handlechange} id="outlined-basic" label="Email" variant="outlined" />
    <TextField name="password" value={FormData.password} onChange={handlechange} id="outlined-basic" label="Password" variant="outlined" />
    <Button type="submit" variant="contained" sx={{bgcolor:'orange'}}>Register</Button>
    </Box>
    </form>
    </Paper>
    </Modal>
    </Stack>
)
}

export default Register