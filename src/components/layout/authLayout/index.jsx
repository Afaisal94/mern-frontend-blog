import React from "react";
import "./../../../assets/scss/styles.scss";
import "./../../../assets/scss/layout/_authentication.scss";

const AuthLayout = (props) => {
  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Copyright &copy; Admin Blog 2022</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
