
import Feed from "./Feed"
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Home = () => {

    const{searchResults} = useContext(DataContext)

    return <>
        <div className="home">
            <main >
                {searchResults.length ? <Feed post={searchResults} /> : <p>There are no existing posts</p>}
            </main>
        </div>
    </>
}

export default Home;


