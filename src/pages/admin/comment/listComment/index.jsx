import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentsPaging,
  getTotalComments,
  deleteComment,
} from "../../../../hooks/useComment";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

export const ListComment = () => {
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
    queryKey: ["comments", { page, limit }],
    queryFn: async () => await getCommentsPaging({ page, limit }),
  });

  const { isLoading: totalLoading, data: totalComments } = useQuery({
    queryKey: ["totalComments"],
    queryFn: getTotalComments,
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deleteComment({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
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
        <h1 className="mt-4">List Comments</h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Comment</th>
                <th>Post</th>
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

              {!isLoading && data.totalDocs ? (
                <>
                  {data.docs.map((comment, index) => (
                    <tr key={comment._id}>
                      <td>{index + 1}</td>
                      <td>{comment.createdAt}</td>
                      <td>{comment.comment}</td>
                      <td>{comment.post?.title}</td>
                      <td>
                        <button
                          onClick={() => {
                            HandleDelete(comment._id);
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

          {!totalLoading && totalComments > 0 ? (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={page}
                itemsCountPerPage={limit}
                totalItemsCount={totalComments}
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
