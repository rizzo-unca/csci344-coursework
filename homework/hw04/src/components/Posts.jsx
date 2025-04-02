//  Job: i have, no idea, but ima figure it out
import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post.jsx";

export default function Posts({ token }) {
    //  When useState is invoked, it returns an array with 2 values:
    //  The first value is the state variable itself (posts), 
    //  The second value is a function whose ob it is to set the state variable & redraw the screen
    const [posts, setPosts] = useState([]);
    const [counter, setCounter] = useState(0);


    async function getPosts() {
        const data = await getDataFromServer(token, "/api/posts");
        console.log(data);
        setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    function addOneToCounter() {
        setCounter(counter + 1);
    }

    console.log("Redraw screen with", counter);
    return <div>
        TODO: output all of the posts: {posts.length}
        {posts.map((post) => (
            <Post token={token} postJSON={post} />
        ))}
        <br />
        <button onClick={addOneToCounter}>{counter}</button>
        </div>;
    
}
