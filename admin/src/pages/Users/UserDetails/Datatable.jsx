import "../UserDetails/list.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { GridDeleteForeverIcon } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { GridToolbar } from '@mui/x-data-grid';
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Datatable = () => {

  const[users, setUsers] = useState([]);
  
  useEffect(() => {
   
  fetchUsers();
  
}, []);

  const fetchUsers = async () => {
    try {
       const response = await axios.get(`http://localhost:5100/api/users`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUsers(response.data);
    console.log(response.data);
    } catch (error) {
      console.log({message:"Error fetching users"});
    }
 
  };
  
  const handleDelete = async (id) => {
    try {
       const deleteUser = await axios.delete(`http://localhost:5100/api/users/${id}`)
    if (deleteUser.data) {
      fetchUsers();
    }
    } catch (error) {
      console.log({message:"Error fetching users"});
  }};

  const handleView = async (id) => {
    try {
       const updatedUser = await axios.put(`http://localhost:5100/api/users/${id}`)
    if (updatedUser.data) {
      fetchUsers();
    }
    } catch (error) {
      console.log({message:"Error fetching users"});
  }};





  const actionColoumn = [
    {
      field: "action",
      header: "Action",
      width: "200",
      renderCell: (params) => {
        return (
          <div
            className="cellAction"
            style={{ display: "flex", flexDirection:"row",gap:'20px'}}
          >
            <Link to={`/users/${params.row.id}`} style={{ textDecoration:"none"}}>
              <div
              onClick={() => handleView(params.row.id)}
              className="viewButton"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <VisibilityIcon sx={{ marginTop: "0.8%" }} />
              
              </div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <GridDeleteForeverIcon sx={{ marginTop: "2px" }} />
            
            </div>
          </div>
        );
      },
    },
  ];

const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" style={{width:'50px'}} />
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
  
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
{
  field: "country",
  headerName: "Country",
  width: 180,
},

    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];




  const userRows = users.map((user) => {
    return {
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      country: user.country,
    };
  });

  return (
    <div className="datatable" style={{ height: 400, width: "100%" }}>
      <div
        className="datatableTitle"
        style={{
          width: "95%",
          fontSize: "24px",
          color: "grey",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        Add New User
        <Link
          to="/users/new"
          style={{ textDecoration: "none", color: "green" }}
        >
          <Button variant="contained" startIcon={<GridAddIcon />}>
            Add New
          </Button>
        </Link>
      </div>
      <DataGrid
        rows={userRows}
        slots={{ toolbar: GridToolbar }}
        columns={userColumns.concat(actionColoumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
