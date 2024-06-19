import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Camera from '../../Components/assets/camera.jpg';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';

import './New.scss';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

  const New = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const [data, setData] = useState({});
  console.log(data);
  console.log(file);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
    };

    const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    for (const key in data) {
    formData.append(key, data[key]);
    }
    console.log(formData);

    try {
      const response = await axios.post(`http://localhost:5100/api/auth/register`, {formData}, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='new' style={{ display: 'flex' }}>
      <Sidebar />
      <div className="newContainer" style={{ flex: '6' }}>
        <Navbar />
        <div className="top">
          <h1 style={{ color: 'lightgrey', fontSize: '20px' }}>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : Camera} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ backgroundColor: 'teal' }}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={(e) => setFile(e.target.files[0])} />
              </Button>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <TextField
                    id={input.id}
                    onChange={handleInput}
                    type={input.type}
                    label={input.label}
                    variant="outlined"
                  />
                </div>
              ))}

              <Button
                type='submit'
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  marginTop: '10px',
                  width: '150px',
                  padding: '10px',
                  backgroundColor: 'teal',
                  color: 'white',
                  cursor: 'pointer',
                  alignItems: 'center',
                }}
              >
                SEND
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
