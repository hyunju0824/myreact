import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { myPostList } from '../recoil/atoms/myAtom';
import { myCommentList } from '../recoil/atoms/myAtom';
function Details() {
    const {userId, postId} = useParams();
    const [comments, setComments] = useRecoilState(myCommentList);
    console.log(postId);
    const getComments = (postId) => {
      return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.data)
        .catch(error => {
          console.error('Error:', error);
          return [];
        });
    };
    useEffect(() => {
      if (!comments[postId]) {
        getComments(postId).then(data => {
          setComments(prevComments => ({
            ...prevComments,
            [postId]: data
          }));
        });
      }
      console.log(comments);
    }, [postId, comments, setComments]);
  

    const data = useRecoilValue(myPostList);
    // 게시글 하나
    const users = data && data.filter((item) => item.userId.toString() === userId);
    const detail = users && users.filter((item) => item.id.toString() === postId);
    const index = users.findIndex(item => item.id.toString() === postId);
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
            <ul role="list" className="divide-y divide-gray-100">
          {comments[postId]?.length > 0 
            ? comments[postId].map((comment) => (
            <li key={comment.id} className="flex items-center justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{comment.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.email}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">{comment.body}</p>
                </div>
              </div>
              {/* <a
                href={comments.href}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View
              </a> */}
            </li>
          ))
          : "댓글이 없습니다."
          }
        </ul>
        {/* <a
          href="#"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          View all
        </a> */}
        </div>
 );
}

export default Details;