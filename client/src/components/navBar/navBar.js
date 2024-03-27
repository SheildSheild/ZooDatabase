import './navBar.css'
import { Link } from 'react-router-dom';

export default function Navbar({links}){
  return <>
  <ul className='navbar'>
    {links.map((link) => (
      <li className='nav-link'>
        <Link className='nav-a' to={"/"+link[0]}>{link[1]}</Link>
      </li>
    ))}
  </ul>
  <br/><br/>
  </>;
}