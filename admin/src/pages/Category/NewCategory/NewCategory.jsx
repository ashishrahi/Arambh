import Navbar from '../../../Components/Navbar/Navbar'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Button,Box} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addedCategories } from '../../../Store/categorySlice';

const New = () => {
const dispatch = useDispatch()

const[categoryname,setCategoryname] = useState({})

  const handleSubmit = async(e) => {
    e.preventDefault();
   dispatch(addedCategories(categoryname));
  };

  return (
    <div className='new' style={{ display: 'flex' }}>
      <Sidebar />
      <div className="newContainer" style={{ flex: '6' }}>
        <Navbar />
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'30px'}}>
        <form method='post' onSubmit={handleSubmit}>
          <div style={{alignItems:'center'}}>
          <div className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
            label="NewCategory"
              variant="outlined"
              name="categoryName"
              sx={{width:'200px'}}
              onChange={(e)=>setCategoryname(e.target.value)}
            />
            
          </div>
          <Button type='submit'  endIcon={<SendIcon/>}
            sx={{
              marginTop: '10px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Add
          </Button>
          </div>
        </form>
        </Box>
      </div>
    </div>
  );
}

export default New;
