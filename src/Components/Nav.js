
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Nav = () => {
    const {search, setSearch} = useContext(DataContext)
    return <>
        <nav className='nav'>
            <form className="search-form">
                <label htmlFor='search'></label>
                <input type='text' id='search-input' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search post' />
            </form>
            <ul className='nav-list'>
                <li><Link to="/" className='nav-child-home'>Home</Link></li>
                <li><Link to="/post" className='nav-child'>Post</Link></li>
                <li><Link to="/about" className='nav-child'>About</Link></li>
            </ul>
        </nav>
    </>
}

export default Nav;