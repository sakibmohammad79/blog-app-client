/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client";
import BlogCard from "./BlogCard";

const GET_POSTS = gql`
  query posts {
    posts {
      content
      id
      title
      createdAt
      author {
        name
        email
        id
      }
    }
  }
`;

const BlogPage = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  // console.log(data, "data");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {data?.posts.map((post: any) => (
        <BlogCard post={post} key={post?.id} />
      ))}
    </div>
  );
};

export default BlogPage;
