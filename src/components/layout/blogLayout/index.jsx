import React from "react";
import "./../../../assets/scss/styles.scss";
import "./../../../assets/js/scripts.js";
import Navbar from "../../blog/navbar";
import Footer from "../../blog/footer";

const BlogLayout = (props) => {
  return (
    <div className="container" style={{backgroundColor: '#F9F9F9'}}>
      <Navbar />
      <div className="container">{props.children}</div>
      <Footer />
    </div>
  );
};

export default BlogLayout;
