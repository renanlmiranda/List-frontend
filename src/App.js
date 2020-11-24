import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import { BrowserRouter } from 'react-router-dom';
// import GlobalStyle from './styles/global';
// import Routes from './routes';
// import AppProvider from './hooks';

// const App = () => (
//     // <BrowserRouter>
//   //   <AppProvider>
//   //     <Routes/>
//   //   </AppProvider>

//   //   <GlobalStyle/>
//   // </BrowserRouter>

//   );

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/users');
      setPosts(res.data);
      setLoading(false);
    };
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
      <h1>Test</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </>
  );
};

export default App;
