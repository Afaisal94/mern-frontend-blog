import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Home, SinglePage, Category, Search,
  Login, 
  Dashboard, 
  ListCategory, CreateCategory, EditCategory, 
  ListPost, CreatePost, EditPost, GeneratePost, 
  ListComment,  
  NotFound
} from "../pages";

export const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Landing Blog */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<SinglePage />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/search/:keyword" element={<Search />} />
           
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Category */}
          <Route path="/category" element={<ListCategory />} />
          <Route path="/category/create" element={<CreateCategory />} />
          <Route path="/category/edit/:id" element={<EditCategory />} />
          {/* Post */}
          <Route path="/post" element={<ListPost />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
          <Route path="/post/generate" element={<GeneratePost />} />
          {/* Comment */}
          <Route path="/comment" element={<ListComment />} />
          {/* Login */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
