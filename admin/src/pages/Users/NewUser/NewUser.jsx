// src/NewUserForm.js

import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Avatar } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../../Store/userSlice';

const NewUserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    file: null,
  });
 const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    dispatch(signupUser(formData));
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {formData.file && (
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                {formData.file.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewUserForm;
