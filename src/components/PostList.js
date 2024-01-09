import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom'; 
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilValue } from 'recoil';
import { myUserList, myPostList } from '../recoil/atoms/myAtom';


const tabs = [
  { name: '전체', href: '#', current: true },
  { name: '작성 중', href: '#', current: false },
  { name: '작성 완료', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join('')
}

export default function PostList() {
  const [currentTab, setCurrentTab] = useState(tabs.find(tab => tab.current));
  const data = useRecoilValue(myPostList);

  const { userId } = useParams();
  const posts = data && data.filter((item) => item.userId == userId); // '==' 연산자 사용
  
  // 유저 이름 등 가져오기
  // const useUserInfo = userInfo && userInfo.filter((item) => item.userId == userId); // '==' 연산자 사용



  const TabContents = {
    '전체': () => <div>{posts && posts.map((post, index) => (
      <div key={index}>
        <ul>
          <li><Link to={`/postList/${post.userId}/${post.id}`}>{post.title} 전체 id : {post.id}, userid : {post.userId}</Link></li>
        </ul>
      </div>
  ))}</div>,
    '작성 중': () => <div>{posts && posts.filter(post => !post.completed).map((post, index) => (
      <div key={index}>
        <ul>
          <li><Link to={`/postList/${post.userId}/${post.id}`}>{post.title} 작성중 id : {post.id}, userid : {post.userId}</Link></li>
        </ul>
      </div>
  ))}
</div>,
    '작성 완료': () => <div>{posts && posts.filter(post => post.completed).map((post, index) => (
          <div key={index}>
            <ul>
              <li><Link to={`/postList/${post.userId}/${post.id}`}>{post.title} 작성 완료 id : {post.id}, userid : {post.userId}</Link></li>
            </ul>              
          </div>
      ))}
      </div>
  };

  const TabContent = TabContents[currentTab.name];


  return (
    <div className="border-b border-gray-200 pb-5 sm:pb-0">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Candidates</h3>
      <div className="mt-3 sm:mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            value={currentTab.name}
            onChange={(e) =>
              setCurrentTab(tabs.find((tab) => tab.name === e.target.value))
            }
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab === currentTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                )}
                aria-current={tab === currentTab ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(tab);
                }}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="tab-content">
        <TabContent />
      </div>
    </div>
  )
}
