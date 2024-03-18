import './navBar.css'
import { Link } from 'react-router-dom';

export default function Navbar({links}){
  return <>
  <ul className='navbar'>
    {links.map((link, index) => (
      <li className='nav-link'>
        <Link className='nav-a' to={"/"+link}>{link}</Link>
      </li>
    ))}
  </ul>
  </>;
}