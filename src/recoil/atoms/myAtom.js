import {atom} from "recoil";
export const myUserList = atom({
    key : "myUserList",
    default : []
})
export const myPostList = atom({
    key : "myPostList",
    default : []
})
export const myCommentList = atom({
    key: 'myCommentList',
    default: {},
  });