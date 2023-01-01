import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../../hooks/useCategory";
import { BaseApiUrl } from "../../../../utils/BaseApiUrl";
import axios from "axios";

export const GeneratePost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    await axios
      .post(`${BaseApiUrl}/postgenerator`, {
        keyword: keyword,
        size: size,
        category: category,
      })
      .then((response) => {
        // setTimeout(() => {
        //   navigate("/post");
        // }, 5000);
        navigate("/post");
      });
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Generate Post</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Keyword</label>
              <input
                type="text"
                className="form-control"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Size</label>
              <select
                className="form-control"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="10">10 Posts</option>
                <option value="30">30 Posts</option>
                <option value="50">50 Posts</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">- Select Category -</option>
                {!isLoading ? (
                  <>
                    {data.docs.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>

            <br />

            {isProcessing ? (
              <button class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
