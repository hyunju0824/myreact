import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { myUserList, myPostList } from '../recoil/atoms/myAtom';
import { myCommentList } from '../recoil/atoms/myAtom';

import UserComment from './UserComment';
import UserCommentList from './UserCommentList';

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

    // 유저 이름 등 가져오기
  const userInfo = useRecoilValue(myUserList);
  const useUserInfo = userInfo && userInfo.find(user => user.id == userId);

    return (
        <div>
            {detail && detail.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-5">
                <h2 className="font-semibold leading-6 text-gray-900">Title : {item.title}</h2>
                {/* <p>ID : {item.userId}</p> */}
                {useUserInfo && <p>User name : {useUserInfo.username}</p>}
                <p className="mt-2 max-w-4xl text-sm text-gray-500">
                  Workcation is a property rental website. Etiam ullamcorper massa viverra consequat, consectetur id nulla tempus.
                  Fringilla egestas justo massa purus sagittis malesuada.
                </p>
                
              </div>
                // <div key={item.id}>   
                //     <p>ID : {item.userId}</p>
                //     <p>글 번호 : {item.id}</p>
                //     <p>제목 : {item.title}</p>
                // </div>
            ))}
            {prev ? (<p><Link to={`/postList/${prev.userId}/${prev.id}`}>이전글 : {prev.title}</Link></p>) : (<p>이전글 없음</p>)}
            {next ? (<p><Link to={`/postList/${next.userId}/${next.id}`}>다음글 : {next.title}</Link></p>) : (<p>다음글 없음</p>)}
            <UserComment></UserComment>
            {/* <UserCommentList></UserCommentList> */}
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