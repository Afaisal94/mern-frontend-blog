import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../hooks/useCategory";

function Sidebar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${query}`);
    setQuery("");
  };
  return (
    <div className="col-lg-5">
      <div className="card mb-4">
        <div className="card-header">Search</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search Post"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <input
                className="btn btn-primary"
                id="button-search"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">Categories</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <ul className="list-unstyled mb-0">
                {!isLoading ? (
                  <>
                    {data.docs.map((category) => (
                      <li key={category._id}>
                        <Link to={`/category/${category.name}`}>
                        <span className="badge bg-primary">
                          {category.name}
                        </span>
                        </Link>
                      </li>
                    ))}
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
