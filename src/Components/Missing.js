import { Link } from "react-router-dom";


const Missing = () => {
    return <>
        <main className="missing">
            <h2>Page Not Found</h2>
            <p>that is disappointing</p>
            <Link to='/'> visit our homepage </Link>
        </main>
    </>
}

export default Missing;