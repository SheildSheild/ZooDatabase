import { Drawer, List, ListItem, ListItemText, ListItemButton, IconButton, Collapse, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';
import {ExpandLess,ExpandMore} from '@mui/icons-material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { managerLinks,employeeLinks,medicLinks,customerLinks } from './sidebarList';

function SideBar({reRender,userData,setMainComponent}){
  const [open,setOpen] = useState({});
  const [renderCnt,render]= useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // New state for sidebar visibility
  const handleDrawerToggle = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };
  const sidebarLinks = [];

  const role = localStorage.getItem('role');
  switch(role){
    case 'Customer':
      sidebarLinks.push(...customerLinks);
      break;
    case 'Manager':
      sidebarLinks.push(...managerLinks);
    case 'Medic':
      sidebarLinks.push(...medicLinks);
    default:
      sidebarLinks.push(...employeeLinks)
  }

  const groups={default:[]}
  sidebarLinks.forEach(sidebar=>{
    if(sidebar.group){
      if(groups[sidebar.group])
        groups[sidebar.group].push(sidebar);
      else
        groups[sidebar.group]=[sidebar];
    }
    else
      groups.default.push(sidebar);
  });

  const sidebar=[];
  for(let group in groups){
    const sidebarList=groups[group].map(item=>
      <ListItem>
        <button className='sidebar-item' onClick={()=>{
            item.onClick(userData,setMainComponent);
            reRender();
            console.log('rerender')
          }}>{item.text}</button>
      </ListItem>
    );
    if(group=='default')
      sidebar.push(<>{sidebarList}</>);
    else
      sidebar.push(<>
        <ListItem onClick={()=>{
          open.group=!open.group;
          render(renderCnt+1);
        }}>
          <button className='sidebar-item'>
            {group}
          </button>
          {open.group ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <ListItem>
          <Collapse in={open.group} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sidebarList}
            </List>
          </Collapse>
        </ListItem>
      </>);
  }
  const handleToggle = group => {
    setOpen(prevOpen => ({ ...prevOpen, [group]: !prevOpen[group] }));
    reRender(); 
  };
  return (
    <>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, ...(isSidebarOpen && { display: 'none' }) }}
    >
      <MenuIcon />
    </IconButton>
    <Drawer
      variant="temporary"
      anchor="left"
      open={isSidebarOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }} // Better open performance on mobile.
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
    >
    <List sx={{ width: '100%', bgcolor: 'background' }}>
      {Object.entries(groups).map(([group, links]) => (
        <React.Fragment key={group}>
          {group !== 'default' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleToggle(group)}>
                <ListItemText primary={group} />
                {open[group] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
          )}
          <Collapse in={open[group] || group === 'default'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {links.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => {
                    item.onClick(userData, setMainComponent);
                    reRender();
                  }}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
    </Drawer>
    </>
  );
}

export default SideBar;