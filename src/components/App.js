import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import UserList from './UserList';
import PostList from './PostList';
import { Routes, Route } from "react-router-dom";
import Details from './Details';
import { myUserList, myPostList } from '../recoil/atoms/myAtom';
import { useRecoilState } from "recoil";

// 유효성 검사 구성 요소

function App() {
  // 초기값 = null
  const [userList, setUserList] = useRecoilState(myUserList);

  useEffect(() => {
    const fetchUserList= async () => {
      try {
        // get방식(url)
        const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');

        setUserList(userResponse.data);
        // 10개

        console.log(userResponse.data);


      } catch (error) {
        console.error("에러 :", error);
      }
    };

    fetchUserList();
  }, []);

  const [postList, setPostList] = useRecoilState(myPostList);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // get방식(url)
        const postResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setPostList(postResponse.data);

        console.log(postResponse.data);

      } catch (error) {
        console.error('에러 :', error);
      }
    };

    fetchPostData();
  }, []);
  
  
  return (
    <div>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <h3>app.js시작</h3>
      {/* 라우터 */}
      <Routes>
        {/* 처음 실행하면 뜨는 userList 화면 */}
        {/* 이 주소를 부르면 이 컴포넌트를 가져오겠다. */}
        <Route path="/" element={<UserList />} />
        {/* userId값을 받는 화면에서는 useParams 사용해야함. */}
        <Route path="/postList/:userId" element={<PostList />}/>
        <Route path="/postList/:userId/:id" element={<Details />} />
      </Routes>
      <h3>app.js끝</h3>
    </div>
  );
}
export default App;