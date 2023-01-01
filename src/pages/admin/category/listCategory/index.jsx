import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategoriesPaging,
  getTotalCategories,
  deleteCategory,
} from "../../../../hooks/useCategory";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

export const ListCategory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  let limit = 10;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", { page, limit }],
    queryFn: async () => await getCategoriesPaging({ page, limit }),
  });

  const { isLoading: totalLoading, data: totalCategories } = useQuery({
    queryKey: ["totalCategories"],
    queryFn: getTotalCategories,
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deleteCategory({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const HandleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">List Category </h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active">
            <Link to={"/category/create"} className="btn btn-primary">
              Create
            </Link>
          </li>
        </ol>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3}>
                    <center>
                      <h4>Loading ...</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {isError ? (
                <tr>
                  <td colSpan={3}>
                    <center>
                      <h4>{error.message}</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {!isLoading && totalCategories > 0 ? (
                <>
                  {data.docs.map((category, index) => (
                    <tr key={category._id}>
                      <td>{(page - 1) * limit + 1 + index}</td>
                      <td>{category.name}</td>
                      <td>
                        <Link
                          to={`/category/edit/${category._id}`}
                          className="btn btn-sm btn-success m-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            HandleDelete(category._id);
                          }}
                          className="btn btn-sm btn-danger m-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>

          {!totalLoading && totalCategories > 0 ? (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={page}
                itemsCountPerPage={limit}
                totalItemsCount={totalCategories}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="<"
                nextPageText=">"
              />
            </div>
          ) : null}
        </div>
      </div>
    </AdminLayout>
  );
};
