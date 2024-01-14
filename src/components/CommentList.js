import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { atom, RecoilState, RecoilValue, useRecoilState, useRecoilValue } from 'recoil';
import { myCommentList, myCommentUpdate } from '../recoil/atoms/myAtom';
import Details from './Details';
  
  export default function CommentList({postId}) {
     const [comments, setComments] = useRecoilState(myCommentList);
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

    // 댓글 총 개수

    
    return (
      <div>
        <ul role="list" className="divide-y divide-gray-100">
          {comments[postId]?.length > 0 
              ? comments[postId].map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.body}</p>
                </div>
              </div>
              <a
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View
              </a>
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
    )
  }
  