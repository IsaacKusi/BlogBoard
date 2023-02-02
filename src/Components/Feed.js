import PostItem from "./PostItem";

const Feed = ({post})=>{
    return <>
        {post.map((posts)=>(
            <PostItem posts={posts} key={posts.id} />
        ))}
    </>
}

export default Feed;