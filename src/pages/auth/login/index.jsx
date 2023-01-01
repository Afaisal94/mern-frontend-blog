import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthLayout } from "../../../components";
import { BaseApiUrl } from "../../../utils/BaseApiUrl";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);
    await axios
      .post(`${BaseApiUrl}/auth/login`, formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        navigate("/dashboard");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };
  return (
    <div>
      <AuthLayout>
        <div className="card-header bg-primary">
          <h3 className="text-center font-weight-light my-4">Login</h3>
        </div>
        <div className="card-body">
          {validation.message && (
            <div className="alert alert-danger">{validation.message}</div>
          )}
          <form onSubmit={loginHandler}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="password"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <div className="d-grid gap-2 mt-4 mb-0">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};
