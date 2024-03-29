import React, { useState, useEffect} from "react";
import axios from "axios";
import DOMPurify from 'dompurify';
import API_BASE_URL from '../../config';
import LoginButton from "../Auth/LoginButton"
import LogOut from "../Auth/LogOut";
import {token} from "../Auth/Token";
import DashboadButton from "./DashboardButton";

const BlogPostList = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/postlist`)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            alert(`Error fetching blog posts:
            ${error}`);
        })
    }, [])

    const getPostReadMore = (content) => {
        const words = content.split(' ');
        if (words.length > 50){
            return words.slice(0, 50).join(' ') + '...';
        }else{
            return words.join(' ');
        }
    }

    return(
        <div>
            <h1>Articles</h1>
            <div>{token 
            ? <> <DashboadButton />  <LogOut /> </>
            : <LoginButton /> }</div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h1><a href={`/posts/${post.id}`}>{post.title}</a></h1>
                        <p><em>{post.author.username}</em></p>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getPostReadMore(post.content)) }} />
                        <a href={`/posts/${post.id}`}>Read More</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BlogPostList;