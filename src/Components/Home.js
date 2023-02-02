
import Feed from "./Feed";

const Home = ({ post }) => {
    return <>
        <div className="home">
            <main >
                {post.length ? <Feed post={post} /> : <p>There are no existing posts</p>}
            </main>
        </div>
    </>
}

export default Home;


