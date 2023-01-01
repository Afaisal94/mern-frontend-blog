import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostsPaging, getTotalPosts, deletePost } from "../../../../hooks/usePost";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

export const ListPost = () => {
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
    queryKey: ["posts", { page, limit }],
    queryFn: async () => await getPostsPaging({ page, limit }),
  });

  const { isLoading: totalLoading, data: totalPosts } = useQuery({
    queryKey: ["totalPosts"],
    queryFn: getTotalPosts,
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deletePost({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
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
        <h1 className="mt-4">List Post </h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active">
            <Link to={"/post/create"} className="btn btn-primary m-1">
              Create
            </Link>

            <Link to={"/post/generate"} className="btn btn-primary m-1">
              Generate AutoPost
            </Link>
          </li>
        </ol>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Post Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5}>
                    <center>
                      <h4>Loading ...</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {isError ? (
                <tr>
                  <td colSpan={5}>
                    <center>
                      <h4>{error.message}</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {!isLoading && totalPosts > 0 ? (
                <>
                  {data.docs.map((post, index) => (
                    <tr key={post._id}>
                      <td>{(page - 1) * limit + 1 + index}</td>
                      <td>{post.createdAt}</td>
                      <td>{post.title}</td>
                      <td>{post.category?.name}</td>
                      <td>
                        <Link
                          to={`/post/${post.slug}`}
                          className="btn btn-sm btn-secondary m-1"
                          target="_blank"
                        >
                          Preview
                        </Link>
                        <Link
                          to={`/post/edit/${post._id}`}
                          className="btn btn-sm btn-success m-1"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => {
                            HandleDelete(post._id);
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

          {!totalLoading && totalPosts > 0 ? (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={page}
                itemsCountPerPage={limit}
                totalItemsCount={data?.totalDocs}
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
