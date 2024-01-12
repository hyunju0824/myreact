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

const loadPersistedComments = () => {
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : [];
};

export const myCommentSave = atom({
   key: 'myCommentSave',
   default: loadPersistedComments(),
});