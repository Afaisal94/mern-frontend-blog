import React, { useEffect } from "react";
import { AdminLayout } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTotalCategories } from "../../../hooks/useCategory";
import { getTotalPosts } from "../../../hooks/usePost";
import { getTotalComments } from "../../../hooks/useComment";

export const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const { isLoading: categoryLoading, data: totalCategories } = useQuery({
    queryKey: ["totalCategories"],
    queryFn: getTotalCategories,
  });

  const { isLoading: postLoading, data: totalPosts } = useQuery({
    queryKey: ["totalPosts"],
    queryFn: getTotalPosts,
  });

  const { isLoading: commentLoading, data: totalComments } = useQuery({
    queryKey: ["totalComments"],
    queryFn: getTotalComments,
  });

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <div className="col-xl-4 col-md-4">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                {categoryLoading
                  ? "Loading ..."
                  : `You have ${totalCategories} Categories`}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  to={"/category"}
                  className="small text-white stretched-link"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4">
            <div className="card bg-secondary text-white mb-4">
              <div className="card-body">
                {postLoading ? "Loading ..." : `You have ${totalPosts} Posts`}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to={"/post"} className="small text-white stretched-link">
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                {commentLoading
                  ? "Loading ..."
                  : `You have ${totalComments} Comments`}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  to={"/comment"}
                  className="small text-white stretched-link"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
