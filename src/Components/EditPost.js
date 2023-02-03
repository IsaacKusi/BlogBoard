import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useContext } from 'react'
import DataContext from '../context/DataContext'


const EditPost = () => {
    const { post, editTitle, setEditTitle, editBody, setEditBody, handleEdit } = useContext(DataContext) 
    const { id } = useParams()
    const posts = post.find((posts) => (posts.id).toString() === id)

    useEffect(() => {
        if (posts) {
            setEditTitle(posts.title)
            setEditBody(posts.body)
        }

    }, [posts, setEditTitle, setEditBody])

    return <>
        <main className="new-post">
            {posts &&
                <div>
                    <h2>Edit Post</h2>
                    <form className="new-post-form" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="editTitle">Title:</label>
                        <input type="text" id='post-title' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                        <label htmlFor="editBody">Post:</label>
                        <textarea id="post-body" value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                        <button
                            style={{ fontWeight: 'bolder' }}
                            type="submit" className="btn-btn-2"
                            onClick={() => handleEdit(posts.id)}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            }{
                !posts && <>
                    <p>No post Available</p>
                    <p>that is disappointing</p>
                    <Link to='/'> visit our homepage </Link>
                </>
            }
        </main>
    </>
}

export default EditPost;