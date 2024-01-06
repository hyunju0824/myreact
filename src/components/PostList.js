import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom'; 
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilValue } from 'recoil';
import { myPostList } from '../recoil/atoms/myAtom';

// 이렇게 한줄로 써도 됨. props 사용
export default function PostList() {
    const data = useRecoilValue(myPostList);
    const { userId } = useParams();
    // userId가 똑같은 애들만 가져오기
    const posts = data && data.filter((item) => item.userId.toString() === userId);
    let [currentTab, clickTab] = useState(0);


    function TabContent(props){
      if(props.currentTab === 0){
        return <div>{posts && posts.map((post, index) => (
          <div key={index}>
            <ul>
              <li><Link to={`/postList/${post.userId}/${post.id}`}>{post.title} 전체 id : {post.id}, userid : {post.userId}</Link></li>
            </ul>
          </div>
      ))}</div>
      }else if(props.currentTab === 1) {
        return <div>{posts && posts.filter(post => !post.completed).map((post, index) => (
                  <div key={index}>
                    <ul>
                      <li><Link to={`/postList/${post.userId}/${post.id}`}>{post.title} 작성중 id : {post.id}, userid : {post.userId}</Link></li>
                    </ul>
                  </div>
              ))}
          </div>
      }else if(props.currentTab === 2){
        return <div>{posts && posts.filter(post => post.completed).map((post, index) => (
          <div key={index}>
            <ul>
              <li><Link to={`/postList/${post.userId}/${post.id}`}>{post.title} 작성 완료 id : {post.id}, userid : {post.userId}</Link></li>
            </ul>              
          </div>
      ))}
      </div>
      }
    }


    return (
        <div>
        
        <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={()=>{clickTab(0)}}>전체</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=>{clickTab(1)}}>작성 중</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={()=>{clickTab(2)}}>작성 완료</Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent currentTab={currentTab}/>

        {/* {posts && posts.map((post, index) => (
            <div key={index}>
            <h2>{post.title}</h2>
            </div>
        ))} */}
        
        </div>
    );
}