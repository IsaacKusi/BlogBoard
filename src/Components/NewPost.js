
import { useContext } from "react";
import DataContext from "../context/DataContext";

const NewPost = () => {

    const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } = useContext(DataContext)
    return <>
        <main className="new-post">
            <h2>New Post</h2>
            <form className="new-post-form" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input type="text" id='post-title' value={postTitle} onChange={(e) => setPostTitle(e.target.value)} required />
                <label htmlFor="postBody">Post:</label>
                <textarea id="post-body" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
                <button style={{fontWeight:'bolder'}} type="submit" className="btn-btn-2">Submit</button>
            </form>
        </main>
    </>
}

export default NewPost;