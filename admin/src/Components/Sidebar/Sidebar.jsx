import { Drawer, List, ListItem, ListItemText, Collapse, ListSubheader, Divider } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupIcon from '@mui/icons-material/Group';
import DiamondIcon from '@mui/icons-material/Diamond';
import axios from 'axios';
import { useState,useEffect } from 'react';
import TitleIcon from '@mui/icons-material/Title';
import { useParams } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';


const Sidebar = () => {
  const [open, setOpen] = useState({});
  const [subjectSubcategory,setSubjectSubcategory] = useState([])
  console.log(subjectSubcategory.subcategoryId)
  const {id} = useParams()
  console.log(id)

  useEffect(()=>{
    axios.get('http://localhost:5100/api/subject/${id}/subjectwithsubcategory').then(res=>{
      setSubjectSubcategory(res.data)
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

   const handleClick = (category) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [category]: !prevOpen[category]
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" style={{marginBottom:'30px',fontWeight:'bold',fontSize:'30px'}}>
            <DiamondIcon style={{height:'50%',color:'red'}}/>
            Admin
          </ListSubheader>
        }
      >
        <ListItem button sx={{gap:'10px'}} component={Link} to="/">
          <GridViewIcon/>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button sx={{gap:'10px'}} component={Link} to="/">
        <AdminPanelSettingsIcon/>
        <ListItemText primary="Admin" />
        </ListItem>
        <ListItem button sx={{gap:'10px'}} component={Link} to="/users">
        <GroupIcon/>
        <ListItemText primary="Users" />
        </ListItem>
        
        <ListItem sx={{gap:'10px'}} button component={Link} to="/category">
        <CategoryIcon/>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem sx={{gap:'10px'}} button component={Link} to="/subcategory">
        <ClassIcon/>
        <ListItemText primary="Subcategory" />
        </ListItem >
        <ListItem sx={{gap:'10px'}} button component={Link} to="/subject">
        <SubjectIcon/>
          <ListItemText primary="Subject" />
        </ListItem>
        <ListItem sx={{gap:'10px'}} button component={Link} to="/quiz">
        <QuizIcon/>
          <ListItemText primary="Quiz" />
        </ListItem>

        {subjectSubcategory.map((subject, index) => (
          <div key={index}>
            <ListItem button onClick={() => handleClick(subject.subcategoryname)}>
              <ListItemText primary={subject.subcategoryname} />
              {open[subject.subjectname] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[subject.subcategoryname]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subject.subjectnames.map((subjectname, subIndex) => (
                  <ListItem 
                    key={subIndex} 
                    button 
                    sx={{ pl: 4 }} 
                    component={Link} 
                    to={`/${subject.subcategoryId}/${subjectname.replace(/\s+/g, '-')}`}
                  >
                   <SubjectIcon/> <ListItemText primary={subjectname} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            {index < subjectSubcategory.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
