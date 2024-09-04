import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query posts {
    posts {
      content
      id
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
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      {data?.posts.map((post) => (
        <div>
          <h2>content: {post.content}</h2>
          <h2>Author: {post.author.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
