import {atom} from "recoil";
export const myUserList = atom({
    key : "myUserList",
    default : []
})
export const myPostList = atom({
    key : "myPostList",
    default : []
})
// 댓글List
export const myCommentList = atom({
    key: 'myCommentList',
    default: [],
});
// 
export const myCommentUpdate = atom({
   key: 'myCommentUpdate',
   default: '',
});



