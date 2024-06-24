import '../CategoryDetails/list.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategories, viewCategories, updateCategoryStatus } from '../../../Store/categorySlice';
import { useEffect} from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Debounce utility function
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const Datatable = () => {


  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Debounced functions
  const handleDelete = debounce((id) => {
    dispatch(deleteCategories(id));
  }, 300);

  const handleView = debounce((id) => {
    dispatch(viewCategories(id));
  }, 300);

  const handleStatus = debounce((id) => {
    dispatch(updateCategoryStatus(id));
  }, 300);

  const actionColoumn = [
    {
      field: 'Action', header: 'Action', width: 200, renderCell: (params) => {
        return (
          <div className='cellAction' style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Link to={`/category/${params.row.id}`}>
              <div className="viewButton"
                onClick={() => handleView(params.row.id)}
                style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ color: 'blue', cursor: 'pointer' }}><EditIcon/></span>
              </div>
            </Link>

            <div className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
              <span style={{ color: 'red' }}><DeleteIcon/></span>
            </div>

            <div className="Status"
              onClick={() => handleStatus(params.row.id)}
              style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', color: 'green' }}>
              <span>Status</span>
            </div>
          </div>
        );
      }
    }
  ];

  const userColumns = [
    { field: "key", headerName: "Serial No.", width: 180 },
    {
      field: "categoryname",
      headerName: "Category Name",
      width: 180,
      valueGetter:(params)=>{
        return params.row.status? params.row.categoryname:'';
      }
    },
    {
      field: "categoryimage",
      headerName: "Category Image",
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status ? <span style={{color:'green'}}>{<ToggleOnIcon/>}</span> : <span style={{color:'red'}}>{<ToggleOffIcon/>}</span>}
          </div>
        );
      },
    },
  ];

  const menuRows = categories.map((list, index) => {
    return {
      key: index + 1,
      id: list._id,
      categoryname: list.categoryname,
      status: list.status,
    };
  });
  console.log(menuRows);

  return (
    <div className='datatable' style={{ height: 400, width: '100%' }}>
      <div className="datatableTitle" style={{
        width: '95%', fontSize: '24px', color: 'grey', marginBottom: '10px',
        display: 'flex', fontWeight: 'bold', justifyContent: 'space-between'
      }}>
        <span>Category</span>
        <Link
          to="/category/new"
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
      />
    </div>
  );
}
export default Datatable;
