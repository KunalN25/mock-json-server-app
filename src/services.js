const URL = "http://localhost:8000/posts"

export async function getAllPosts() {
    const res = await fetch(URL) 
    return res.json();
}

export async function addNewPost(title, author) {
    const id = Math.random() * 11;
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, title, author})
    })
}