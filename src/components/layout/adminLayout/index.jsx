import React from "react";
import "./../../../assets/scss/styles.scss";
import "./../../../assets/scss/_variables.scss";
import Navigation from "../../admin/navigation";
import { useNavigate } from "react-router-dom";

const AdminLayout = (props) => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const UserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand */}
        <a className="navbar-brand ps-3" href="index.html">
          ADMIN PANEL
        </a>
        {/* Sidebar Toggle */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* Navbar Search */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group"></div>
        </form>
        {/* Navbar Logout */}
        <button
          className="btn btn-sm btn-danger m-5"
          onClick={() => UserLogout()}
        >
          Logout
        </button>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <Navigation />

            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              {name}
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>{props.children}</main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Admin Blog 2022
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
