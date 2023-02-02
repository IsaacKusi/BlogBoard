
import { useParams, Link } from 'react-router-dom'

const PostPage = ({ post, handleDelete }) => {

    const { id } = useParams()
    const posts = post.find((posts) => (posts.id).toString() === (id));

    return <>
        <main className='post-page'>
            <article className='post'>
                {posts &&
                    <>
                        <h1>{posts.title}</h1>
                        <p>{posts.datetime}</p>
                        <p>{posts.body}</p>
                        <button className='btn-btn-1' onClick={() => handleDelete(posts.id)}>Delete Post</button>
                        <Link to = {`/edit/${posts.id}`}><button className='btn-btn-edit'>Edit Post</button></Link>
                    </>
                }
                {!posts &&
                    <>
                        <p>No post Available</p>
                        <p>that is disappointing</p>
                        <Link to='/'> visit our homepage </Link>

                    </>}
            </article>

        </main>
    </>
}

export default PostPage;