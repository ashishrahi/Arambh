import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Button,Box} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {updatesubCategories} from '../../redux/subcategorySlice';
import { useDispatch } from 'react-redux';

const New = () => {

const[subcategoryname,setSubcategoryname] = useState('')

const dispatch = useDispatch();
const {id} = useParams()
console.log(id)

  const handleSubmit = async(e) => {
    e.preventDefault();
   dispatch(updatesubCategories({id,subcategoryname}))
    
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
            label="Update Category"
              variant="outlined"
              name="categoryname"
              sx={{width:'200px'}}
              onChange={(e)=>setSubcategoryname(e.target.value)}
            />
            
          </div>
          <Button type='submit'  endIcon={<SendIcon/>}
            sx={{
              marginTop: '10px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Update
          </Button>
          </div>
        </form>
        </Box>
      </div>
    </div>
  );
}

export default New;
