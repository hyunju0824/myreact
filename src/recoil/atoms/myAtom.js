import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
    effects_UNSTABLE: [persistAtom],
});
// 
export const myCommentUpdate = atom({
   key: 'myCommentUpdate',
   default: '',
});



