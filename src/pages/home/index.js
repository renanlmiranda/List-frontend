import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import Post from '../../components/List';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    setPosts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Post posts={currentPosts} loading={loading} fetchUsers={fetchUsers} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
};

export default Home;
