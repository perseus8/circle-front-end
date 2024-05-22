"use client";
import MainLayout from "@/components/navigation/MainLayout";
import NewPost from "./NewPost";
import PostLayout from "@/components/view/PostView/PostLayout";
import React from "react";
import { useSearchParams } from "next/navigation";

const Timeline = () => {
  const postLayoutRef = React.useRef<any>(null);
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("blog") : null;

  const handleRefresh = () => {
    if(postLayoutRef && postLayoutRef.current){
      postLayoutRef.current.refresh();
    }
  }

  React.useEffect(() => {
    if(id){
      handleRefresh();
    }
  }, [id]);

  return <MainLayout menu="Timeline">
    <div>
      <NewPost refresh={handleRefresh}/>
      <PostLayout forwardedRef={postLayoutRef} blogId={id} />
    </div>
  </MainLayout>;
};

export default Timeline;
