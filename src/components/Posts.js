import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <li key={post._id} className="list-group-item">
          {post.name}
          {post.age}
          {post.maritalStatus}
          {post.cpf}
          {post.city}
          {post.state}

        </li>
      ))}
    </ul>
  );
};

export default Posts;
