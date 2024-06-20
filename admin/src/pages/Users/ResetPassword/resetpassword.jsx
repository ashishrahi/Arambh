import { Stack,Box, TextField,Button, Typography, Paper, Modal } from "@mui/material"
import { useState } from "react";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { useDispatch } from "react-redux";
import {resetPassword} from "../../../Store/userSlice";
import { useParams } from "react-router-dom";
const Register = () => {
const {token}= useParams();
const dispatch = useDispatch();
console.log(token);

const [open, setOpen] = useState(true);
const[formData,setFormData] = useState('');
console.log(formData);
const handleClose = () => setOpen(true);
const handlechange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    console.log(token)
    dispatch(resetPassword(formData,token))
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
    <FoodBankIcon sx={{marginRight:'10px',color:'orange'}}/>Reset Password</Typography>
    
    <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
    <TextField name="password" value={FormData.password} onChange={handlechange} id="outlined-basic" label="New Password" variant="outlined" />
    <Button type="submit" variant="contained" sx={{bgcolor:'orange'}}>Reset</Button>
    </Box>
    </form>
    </Paper>
    </Modal>
    </Stack>
)
}

export default Register