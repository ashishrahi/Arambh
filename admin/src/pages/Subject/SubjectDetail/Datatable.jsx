import '../SubjectDetail/list.scss'
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { useDispatch,useSelector } from 'react-redux';
import { fetchSubjects,deleteSubjects,viewSubjects,updateSubjectsStatus } from '../../../Store/subjectSlice';
import { useEffect } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const Datatable = () => {

const dispatch = useDispatch();
const subject = useSelector(state => state.subjects.subjects);
console.log(subject);
useEffect(() => {
  
dispatch(fetchSubjects())

}, [dispatch])



//Delete category
const handleDelete = async (id) => {
dispatch(deleteSubjects(id));
};
// View Category
const handleView = async (id) => {
dispatch(viewSubjects(id));
  };
// Change Status
const handleStatus = async (id) => {
  console.log(id)
dispatch(updateSubjectsStatus(id))
    };


const actionColoumn = [
     {field:'action',header:'Action',width:'200',renderCell:(params)=>{
        return(
            <div className='cellAction' style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                <Link to={`/subject/${params.row.id}`}>
                <div className="viewButton" 
                onClick={()=>handleView(params.row.id)}
                style={{display:'flex',flexDirection:'row'}}> 
                <span style={{color:'blue',cursor:'pointer'}}>Edit</span> 
                </div>
                </Link>
                <div className="deleteButton"  
                onClick={()=>handleDelete(params.row.id)}
                style={{display:'flex',flexDirection:'row',cursor:'pointer'}}>
                <span style={{color:'red'}}>Delete</span> 
                </div>
                <div className="Status"  
                onClick={()=>handleStatus(params.row.id)}
                style={{display:'flex',flexDirection:'row',cursor:'pointer'}}>
                <span>Status</span> 
                </div>
            </div>
        )
     }}
]


const userColumns = [
  { field: "key", headerName: "Serial No.", width: 100 },
  
  {
    field: "categoryname",
    headerName: "Category Name",
    width: 280,
  },
  {
    field: "subcategoryname",
    headerName: "Sub-CategoryName",
    width: 180,
  },
  {
    field: "subjectname",
    headerName: "Subject Name",
    width: 180,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status ?<span style={{color:'green'}}>{<ToggleOnIcon/>}</span>  : <span style={{color:'red'}}><ToggleOffIcon/></span>}
        </div>
      );
    },
  },
  


];



    const menuRows= subject.map((list,index)=>{
    return{
      key:index+1,
    id:list._id,
    categoryname:list.categoryname,
    subcategoryname:list.subcategoryname,
    subjectname:list.subjectname,
    status:list.status,
    }
  })

return (
        <div className='datatable' style={{ height: 400, width: '100%' }}>
<div className="datatableTitle" style={{width:'95%',fontSize:'24px',color:'grey',marginBottom:'10px',
display:'flex',fontWeight:'bold',justifyContent:'space-between'}}>
 <span>Subject</span>
 <Link
          to="/subject/new"
          style={{ textDecoration: "none", color: "green" }}
        >
          <Button variant="contained" startIcon={<GridAddIcon />}>
            Add New
          </Button>
        </Link> 
</div>

          <DataGrid
            rows={menuRows}
            columns={userColumns.concat(actionColoumn)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      );
}

export default Datatable