import { getComments, newComment } from "@/apis/blog";
import React, { useRef } from "react";
import { IoSendSharp } from "react-icons/io5";
import PostView from "./PostView";
import ReactQuillEditor from "@/components/input/ReactQuill";
import TransparentInput from "@/components/input/TransparentInput";

interface CommentsViewProps {
  blogId: string;
  commentId: string;
  token: string;
  showCommentInput: boolean;
}

const CommentsView = ({
  blogId,
  commentId,
  token,
  showCommentInput,
}: CommentsViewProps) => {
  const [comment, setComment] = React.useState("");
  const [list, setList] = React.useState([]);
  const ref = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setList([]);
    const { data } = await getComments(blogId, commentId);
    setList(data);
  };

  const handleSend = async () => {
    const result = await newComment(
      blogId,
      token,
      comment.replaceAll("<p><br></p>", ""),
      commentId
    );
    fetchData();
    setComment("");
    try {
      const current = ref.current;
      if (current) {
        const itemList = current.previousElementSibling;
        const itemComment = itemList?.firstElementChild;
        let itemCount = itemComment?.lastElementChild;
        if (itemCount) {
          itemCount.innerHTML = "" + (parseFloat(itemCount.innerHTML) + 1);
        }
      }
    } catch (e) {
      console.log("parsing error", e);
    }
  };

  const handleKeyDown = async (e: any) => {
    if (e.key == "Enter") {
      setComment("");
      e.preventDefault();
      handleSend();
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref}>
      {showCommentInput && (
        <div className="bg-front bg-opacity-10 p-2 rounded-2xl flex px-4 items-center mb-4">
          <TransparentInput
            placeholder="Write your comment here..."
            type="text"
            value={comment}
            setValue={setComment}
            onKeyDown={handleKeyDown}
          />
          <div
            className="hover:scale-95  duration-500 h-fit cursor-pointer"
            onClick={handleSend}
          >
            <IoSendSharp size={16} />
          </div>
        </div>
      )}
      {/* // : <div className="hover:text-primary cursor-pointer text-front2" onClick={()=>{setShowCommentInput(true);}}>Add Comment</div>} */}
      {list.map((item: any, index) => (
        <PostView
          key={index}
          blogId={blogId}
          commentId={item._id}
          username={item.circlename}
          profilename={item.username}
          useravatar={
            item.avatarUrl ? item.avatarUrl : "/img/avatar/default.png"
          }
          content={item.content}
          commentsCount={item.commentsCount}
          likes={item.likes}
          dislikes={item.dislikes}
          circles={item.circles}
          reposts={item.reposts}
          createdAt={item.createdAt}
          // openComment
          isCommented={item.commentId != ""}
        />
      ))}
    </div>
  );
};

export default CommentsView;
