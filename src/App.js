import Header from "./Components/Header";
import Nav from "./Components/Nav";
import NewPost from "./Components/NewPost";
import Home from "./Components/Home";
import About from "./Components/About";
import PostPage from "./Components/PostPage";
import Missing from "./Components/Missing";
import Footer from "./Components/Footer";
import EditPost from "./Components/EditPost";
import './app.css'
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/post';
import useWindowSize from "./hooks/useWindowSize";


const App = () => {
  const [post, setPost] = useState([])
  const [search, setSearch] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const history = useHistory()
  const {width} = useWindowSize()

  useEffect(() => {
    const fetchPostItem = async () => {
      console.log('read me')
      try {
        const response = await api.get('/firstPost');
        setPost(response.data)
      } catch (err) {
        if (err.response) {
          // erros that are not in the status 200 range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error:${err.message}`)
        }
      }
    }

    (async () => await fetchPostItem())()

  }, [])

  useEffect(()=>{

  },[post])

  const handleDelete = async (ID) => {
    try {
      await api.delete(`/firstPost/${ID}`)
      const postItems = [...post]
      const filterItems = postItems.filter((posts) => (posts.id !== ID))
      setPost(filterItems)
      history.push('/')
    } catch (err) {
      console.log(`Error:${err.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = post.length ? post[post.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd,yyyy pp');
    const newPost = { id: id, title: postTitle, datetime: dateTime, body: postBody };
    try {
      const response = await api.post('./firstPost', newPost)
      const listPostItems = [...post, response.data];
      setPost(listPostItems);
      setPostTitle('');
      setPostBody('');

      history.push('/')
    } catch (err) {
      console.log(`Error:${err.message}`)
    }
  }
  
  const handleEdit = async (ID)=>{
    const dateTime = format(new Date(), 'MMMM dd,yyyy pp');
    const newPost = { id: ID, title: editTitle, datetime: dateTime, body: editBody };
    try {
      const response = await api.put(`./firstPost/${ID}`, newPost)
      setPost(post.map((posts)=>(posts.id) === ID? {...response.data}: post));
      setEditTitle('');
      setEditBody('');
      history.push('/')

    } catch (err) {
      console.log(`Error:${err.message}`)
    }

  }



  return (
    <>
      <div className="main-container">
        <div className="app">
          <div>
            <div className="nav-container">
              <Header title='JesusHaus Blogs' width={width}/>
              <Nav search={search} setSearch={setSearch} />
            </div>
            <Switch>
              <Route exact path="/">
                <Home post={post.filter((posts) =>
                  ((posts.body).toLowerCase()).includes((search).toLowerCase()) ||
                  ((posts.title).toLowerCase()).includes((search).toLowerCase()))} />
              </Route>
              <Route exact path="/post">
                <NewPost
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                  handleSubmit={handleSubmit}
                  key={post.id}
                />
              </Route>
              <Route path="/edit/:id">
                <EditPost 
                post = {post}
                editTitle={editTitle} 
                setEditTitle={setEditTitle} 
                editBody={editBody} 
                setEditBody={setEditBody} 
                handleEdit={handleEdit} />
              </Route>
              <Route path="/post/:id">
                <PostPage post={post} handleDelete={handleDelete} />
              </Route>
              <Route path="/about" component={About} />
              <Route path="*" component={Missing} />
            </Switch>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
