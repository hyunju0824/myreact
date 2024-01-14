import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export default function CommentSection({postId}) {
    return (
      <div>
        <CommentInput postId={postId}/>
        <CommentList postId={postId} />
        {/* <CommentInput/> */}
      </div>  
    );
}