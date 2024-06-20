import Navbar from '../../../Components/Navbar/Navbar'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSubjects } from '../../../Store/subjectSlice';
import { useSelector } from 'react-redux';
import { fetchCategories } from '../../../Store/categorySlice';
import { fetchsubCategories } from '../../../Store/subcategorySlice';
import {Autocomplete} from '@mui/material';

const NewSubject = () => {

const dispatch = useDispatch()
const[categoryname,setCategoryname] = useState('')
const[subcategoryname,setSubcategoryname] = useState('')
const[subjectname,setSubjectname] = useState('')
const options = useSelector(state=>state.categories.categories.map(category=>category.categoryname))
const options1 = useSelector(state=>state.subcategories.subcategories.map(subcategory=>subcategory.subcategoryname))

console.log(options)
console.log(categoryname)
console.log(subcategoryname);

useEffect(() => {
dispatch(fetchCategories())
}, [dispatch])

useEffect(() => {
  dispatch(fetchsubCategories())
  }, [dispatch])

const handleSubmit = async(e) => {
   e.preventDefault();
dispatch(addSubjects({categoryname,subcategoryname,subjectname}));
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
            <Autocomplete
            options={options}
            onChange={(e, value) => {
              if (value !== null) {
                setCategoryname(value);
              }
            }}
            renderInput={(params)=><TextField{...params} label='Category Name'/>}
            />
            <Autocomplete
            options={options1}
            onChange={(e, value) => {
              if (value !== null) {
                setSubcategoryname(value);
              }
            }}
            renderInput={(params)=><TextField{...params} label='Category Name'/>}
            />
         
            <TextField
            label="New Subject"
              variant="outlined"
              sx={{width:'200px'}}
              onChange={(e)=>setSubjectname(e.target.value)}

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

export default NewSubject;
