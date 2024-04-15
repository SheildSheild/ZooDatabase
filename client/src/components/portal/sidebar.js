import {List,ListItem,ListItemText,Collapse} from '@mui/material';
import { useState } from 'react';
import {ExpandLess,ExpandMore} from '@mui/icons-material';

import { managerLinks,employeeLinks,medicLinks,customerLinks } from './sidebarList';
function SideBar({reRender,userData,setMainComponent}){
  const [open,_] = useState({});
  const [renderCnt,render]= useState(0);
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

  return <List>{sidebar}</List>;
}

export default SideBar;