import React from 'react';
import { useParams } from 'react-router-dom';

// 이렇게 한줄로 써도 됨.
export default function  PostList({ data }) {
    const { userId } = useParams();

    const posts = data && data.filter((item) => item.userId.toString() === userId);

    return (
        <div>
        {posts && posts.map((post, index) => (
            <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            </div>
        ))}
        </div>
    );
}