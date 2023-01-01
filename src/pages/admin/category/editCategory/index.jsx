import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategoryById, updateCategory } from "../../../../hooks/useCategory";

export const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => await getCategoryById(id),
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (data) {
      setName(data.name);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateCategory({ id, name });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ id, name });
    navigate("/category");
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Category</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                className="form-control"
                value={isLoading ? "Loading ..." : name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
