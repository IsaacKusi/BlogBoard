import { Link } from 'react-router-dom'

const PostItem = ({ posts }) => {
    return <>
        <article className="article">
            <Link className='article-link' to={`post/${posts.id}`}>
                <h2>{posts.title}</h2>
                <p>{posts.datetime}</p>
            </Link>
            <p className="blog-body" style={{ fontSize: '22px' }}>{posts.body.length <= 25 ? (posts.body) : `${(posts.body).slice(0, 25)}......`}</p>
        </article>
    </>}

export default PostItem;