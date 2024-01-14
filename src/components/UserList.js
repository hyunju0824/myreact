import React from 'react';
import { Link } from "react-router-dom";
// 받는 쪽에서는 Value 써야함.
import { useRecoilValue } from 'recoil';
import { myUserList } from '../recoil/atoms/myAtom';

// props

export default function UserList() {
const data = useRecoilValue(myUserList);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data && data.map((item, index) => (
        <Link to={`/postList/${item.id}`} key={index}>
        <div
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
          </div>
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="truncate text-sm text-gray-500">{item.username}</p>
              <p className="truncate text-sm text-gray-500">{item.email}</p>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  )
}