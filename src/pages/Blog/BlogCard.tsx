import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogCard = ({ post }: { post: any }) => {
  const [formatedDate, setFormatedDate] = useState("");
  useEffect(() => {
    if (post.createdAt) {
      let date = post.createdAt;
      date /= 10;
      const dateInstance = new Date(date);
      setFormatedDate(
        `${dateInstance.getDate()}-${
          dateInstance.getMonth() + 1
        }-${dateInstance.getFullYear()}`
      );
    }
  }, [post]);
  return (
    <div className="my-5 p-5 border-x-slate-300 shadow-lg ">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium">
            Author Name: {post?.author?.name}
          </h2>
          <p>Content: </p>
        </div>
        <h3 className="text-1xl font-medium">Data: {formatedDate}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
