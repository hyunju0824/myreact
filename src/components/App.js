import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import UserList from './UserList';
import PostList from './PostList';
import { Routes, Route } from "react-router-dom";
// 유효성 검사 구성 요소

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get방식(url)
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setData(response.data);
      } catch (error) {
        console.error('에러 :', error);
      }
    };

    fetchData();
  }, []);
  
  
  return (
    <div>
      {/* 라우터 */}
      <Routes>
        {/* 처음 실행하면 뜨는 userList 화면 */}
        <Route path="/" element={<UserList data={data} />} />
        <Route path="/postList/:userId" element={<PostList data={data} />} />
      </Routes>
    </div>
  );
}
export default App;
