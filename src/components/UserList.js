import React from 'react';
import { Link } from "react-router-dom";
// 받는 쪽에서는 Value 써야함.
import { useRecoilValue } from 'recoil';
import { myUserList } from '../recoil/atoms/myAtom';

// props
function UserList() {   
    // 중복제거 
    // const users = data && data.map((item) => item.id).filter((id, index, self) => self.indexOf(id) === index);
    const data = useRecoilValue(myUserList);
    return (
      <div>
        {/* users가 null, undefined, false, 0, NaN, 빈 문자열("")이 아닐 경우)일 때만! */}
        {data && <h1> 유저 수 : {data.length}명</h1>}
        {/* user id를 리스트로 */}
        {data && data.map((item, index) => (
          <div key={index}>
            <ul>
                {/* 주소 지정 */}
              <li><Link to={`/postList/${item.id}`}>User ID : {item.id} /// User name : {item.username}</Link></li>
            </ul>
    
          </div>
        ))}

      </div>
    );
  }
  export default UserList;