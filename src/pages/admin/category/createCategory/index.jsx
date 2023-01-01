import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../../../hooks/useCategory";

export const CreateCategory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createCategory({ name });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ name });
    navigate("/category");
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Create Category</h1>
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
                value={name}
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
