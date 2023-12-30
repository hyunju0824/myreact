import React from 'react';
import { Link } from "react-router-dom";

// props
function UserList({ data }) {   
    // 중복제거 
    const users = data && data.map((item) => item.userId).filter((userId, index, self) => self.indexOf(userId) === index);


    return (
      <div>
        {users && <h1> 유저 수 : {users.length}명</h1>}
        {users && users.map((userId, index) => (
          <div key={index}>
            <ul>
                {/* 주소 지정 */}
              <li><Link to={`/postList/${userId}`}>User ID: {userId}</Link></li>
            </ul>
    
          </div>
        ))}

      </div>
    );
  }
  export default UserList;
  