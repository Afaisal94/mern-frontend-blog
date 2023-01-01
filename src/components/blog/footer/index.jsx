import React from "react";

function Footer() {
  return (
    <div>
      <footer className="py-5 bg-dark" style={{borderRadius: '5px'}}>
        <div className="container">
          <p className="m-0 text-center text-white">
            Blog App - Created at 2022
          </p>
        </div>
      </footer>
      {/* Bootstrap core JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
    </div>
  );
}

export default Footer;