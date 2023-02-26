import { useEffect, useState } from "react";
import {getAllPosts} from './services'


const URL = "http://localhost:8000/posts"

function App() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
      fetch(URL).then(res => res.json())
        .then(data => {
            setPosts(data);
        });
    }, [])

    const addNewPost = (event) => {
        event.preventDefault();
        const title = event.target.postTitle.value;
        const author = event.target.postAuthor.value;
        const id = Math.random() * 11;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, title, author})
        }).then(() => {
            console.log('Post submitted successfully')
            getAllPosts().then(data => {
                setPosts(data)
            });
        })
    }   

    const handleDelete = (id) => {
        fetch(`${URL}/${id}`, {
            method: 'DELETE',
        }).then(()=> {
            console.log('post deleted successfully')
            getAllPosts().then(data => {
                setPosts(data)
            });
        })
    }


  return (
    <div className="App">

        <form onSubmit={addNewPost}>
            <label htmlFor="post-title">Enter Post Title</label>
            <input id="post-title" name="postTitle" />
            <label htmlFor="post-author">Enter Your Name</label>
            <input id="post-author" name="postAuthor"/>
            <button type="submit">Add New Post </button>
        </form>

        {posts.map(post => (
            <div>
                <h3>{post.title}</h3>
                <p> Authored by {post.author}</p>
                
                <button> Update</button>
                <button onClick={() => {handleDelete(post.id)}}> Delete </button>
                <hr/>
            </div>
        ))}
    </div>
  );
}

export default App;
