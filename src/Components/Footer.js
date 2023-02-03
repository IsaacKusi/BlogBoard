
import {useContext} from 'react';
import DataContext from '../context/DataContext';



const Footer = () => {

    const{searchResults} = useContext(DataContext)

    const today = new Date ()
    return <>
<footer className="footer">
    {searchResults? <p> {searchResults.length} {searchResults.length <= 1 ? "Post" : "Posts" }</p> : 0}
   <p> copyright &copy; {today.getFullYear()}</p> 
</footer>
    </>
}

export default Footer;