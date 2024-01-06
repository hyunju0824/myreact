import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Details({data}){
    // 게시글 하나
    const {userId, id} = useParams();
    console.log(id);
    console.log(userId);
    
    const users = data && data.filter((item) => item.userId.toString() === userId);
    const detail = users && users.filter((item) => item.id.toString() === id);
    const index = users.findIndex(item => item.id.toString() === id);
    
    console.log(index);
    console.log(users[index-1]);
    const prev = users[index-1];
    const next = users[index+1];
    
    return (
        <div>
            {detail && detail.map((item) => (
                <div key={item.id}>   
                    <p>ID : {item.userId}</p>
                    <p>글 번호 : {item.id}</p>
                    <p>제목 : {item.title}</p>
                </div>
            ))}
            {prev ? (<p><Link to={`/postList/${prev.userId}/${prev.id}`}>이전글 : {prev.title}</Link></p>) : (<p>이전글 없음</p>)}
            {next ? (<p><Link to={`/postList/${next.userId}/${next.id}`}>다음글 : {next.title}</Link></p>) : (<p>다음글 없음</p>)}
        </div>
    );
}