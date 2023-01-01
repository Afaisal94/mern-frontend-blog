import React from "react";

function Header(props) {
  const { title, tagline } = props;
  return (
    <div>
      <header className="py-5 bg-light border-bottom mb-4">
        <div className="container">
          <div className="text-center my-5">
            <h1 className="fw-bolder">{title}</h1>
            <p className="lead mb-0">{tagline}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;