import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Posts = lazy(() => import('./pages/Posts'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const EditPost = lazy(() => import('./pages/EditPost'));
const Services = lazy(() => import('./pages/Services'));
const Profile = lazy(() => import('./pages/Profile'));
const Search = lazy(() => import('./pages/Search'));
const Category = lazy(() => import('./pages/Category'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>EcoVoice - Environmental Awareness Blog</title>
        <meta name="description" content="Join the movement for environmental protection, climate action, and sustainable living. Share stories, raise awareness, and make a difference." />
        <meta name="keywords" content="environment, climate change, sustainability, eco-conscious, pollution, nature protection, global warming, green living" />
        <link rel="canonical" href="https://ecovoice-blog.com" />
      </Helmet>
      
      <ScrollToTop />
      
      <Layout>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              
              {/* Blog Posts */}
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/:id/edit" element={<EditPost />} />
              
              {/* Categories */}
              <Route path="/category/:category" element={<Category />} />
              
              {/* Search */}
              <Route path="/search" element={<Search />} />
              
              {/* User */}
              <Route path="/profile" element={<Profile />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
