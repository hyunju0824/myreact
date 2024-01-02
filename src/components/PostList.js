import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// 이렇게 한줄로 써도 됨. props 사용
export default function  PostList({ data }) {
    const { userId } = useParams();
    const posts = data && data.filter((item) => item.userId.toString() === userId);
    let [currentTab, clickTab] = useState(0);


    function TabContent(props){
      if(props.currentTab === 0){
        return <div>Tab 1 내용입니다.</div>
      }else if(props.currentTab === 1) {
        return <div>Tab 2 내용입니다.</div>
      }else if(props.currentTab === 2){
        return <div>Tab 3 내용입니다.</div>
      }
    }


    return (
        <div>
        {posts && posts.map((post, index) => (
            <div key={index}>
            <h2>{post.title}</h2>
            </div>
        ))}
        
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

        
        
        </div>
    );
}