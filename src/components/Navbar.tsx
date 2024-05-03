import {FC} from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'

const Navbar: FC = () => {
    const headerRoutes = [
        {
            url: '/sandbox',
            title: 'Sandbox'
        },
        {
            url: '/movies',
            title: 'Movies'
        }
    ]

    return (
        <nav className={'navbar bg-dark justify-content-start gap-3 px-3 ' + styles.customNavbar}>
            {headerRoutes.map((route) => {
                return (
                    <NavLink className='nav-item' to={route.url} key={route.url}>
                        {route.title}
                    </NavLink>
                )
            })}
        </nav>
    )
}

export default Navbar;
