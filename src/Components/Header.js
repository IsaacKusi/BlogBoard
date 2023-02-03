
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import {useContext} from 'react';
import DataContext from '../context/DataContext';


const Header = ({title}) => {
    const {width} = useContext(DataContext)
    return <>
<header className="header">
    <h1 className="header-child">{title}</h1>
    <p className='header-tools'>{width < 768? <FaMobileAlt/>: width < 992? <FaTabletAlt />: <FaLaptop />}</p>
</header>
    </>
}

export default Header;