
import { createContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { format } from 'date-fns';
import api from '../api/post';
import useWindowSize from "../hooks/useWindowSize";


const DataContext = createContext({});


export const DataProvider = ({ children }) => {
    const [post, setPost] = useState([])
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const history = useHistory()
    const { width } = useWindowSize()

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

    useEffect(() => {
        const filteredResults = post.filter((posts) =>
            ((posts.body)?.toLowerCase())?.includes((search)?.toLowerCase()) ||
            ((posts.title)?.toLowerCase())?.includes((search)?.toLowerCase()))

        setSearchResults(filteredResults)
    }, [post, search])

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

    const handleEdit = async (ID) => {
        const dateTime = format(new Date(), 'MMMM dd,yyyy pp');
        const newPost = { id: ID, title: editTitle, datetime: dateTime, body: editBody };
        try {
            const response = await api.put(`./firstPost/${ID}`, newPost)
            setPost(post.map((posts) => (posts.id) === ID ? { ...response.data } : posts));
            setEditTitle('');
            setEditBody('');
            history.push('/')

        } catch (err) {
            console.log(`Error:${err.message}`)
        }

    }
    return (
        <DataContext.Provider value={{
            width, postTitle, setPostTitle, postBody,
            setPostBody, handleSubmit, post, editTitle, setEditTitle,
            editBody, setEditBody, handleEdit, handleDelete, search, setSearch, searchResults
        }}>
            {children}
        </DataContext.Provider>
    )

}

export default DataContext;