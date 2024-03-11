import './navBar.css'

export default function Navbar({links}){
  return <>
  <ul className='navbar'>
    {links.forEach(link => 
      <li className='nav-link'><a className='nav-a' href={"/"+link}>{link}</a></li>
    )}
  </ul>
  </>;
}