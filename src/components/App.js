import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import UserList from './UserList';
import PostList from './PostList';
import { Routes, Route } from "react-router-dom";
import Details from './Details';
// 유효성 검사 구성 요소

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get방식(url)
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setData(response.data);

        console.log(response.data);

      } catch (error) {
        console.error('에러 :', error);
      }
    };

    fetchData();
  }, []);
  
  
  return (
    <div>
      <h3>app.js시작</h3>
      {/* 라우터 */}
      <Routes>
        {/* 처음 실행하면 뜨는 userList 화면 */}
        {/* 이 주소를 부르면 이 컴포넌트를 가져오겠다. */}
        <Route path="/" element={<UserList data={data} />} />
        {/* userId값을 받는 화면에서는 useParams 사용해야함. */}
        <Route path="/postList/:userId" element={<PostList data={data} />} />
        <Route path="/postList/:userId/:id" element={<Details data={data} />} />
      </Routes>
      <h3>app.js끝</h3>
    </div>
  );
}
export default App;
