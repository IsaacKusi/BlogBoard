
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';


const Header = ({title, width}) => {
    return <>
<header className="header">
    <h1 className="header-child">{title}</h1>
    <p className='header-tools'>{width < 768? <FaMobileAlt/>: width < 992? <FaTabletAlt />: <FaLaptop />}</p>
</header>
    </>
}

export default Header;