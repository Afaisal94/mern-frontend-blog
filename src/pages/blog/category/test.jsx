import { BlogLayout, Header, Sidebar } from "../../../components";
import { useEffect, useState, Fragment } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostByCategoryName } from "../../../hooks/usePost";
import { BaseApiUrl } from "../../../utils/BaseApiUrl";
import axios from "axios";

export const Category = () => {
  const { categoryName } = useParams();
  let page = 1;
  let limit = 3;

  const {
    isLoading,
    status,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['posts', categoryName],
    async ({ pageParam = 0 }) => {
      const res = await axios.get(`${BaseApiUrl}/posts/categoryname/${categoryName}?paging=true&page=${pageParam}&limit=3`)
      return res.data
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    },
  )

  return (
    <div>
      <BlogLayout>
        <Header
          title={"Blog Category"}
          tagline={`Category : ${categoryName}`}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              {isLoading ? (
                <center>
                  <h3>Loading ...</h3>
                </center>
              ) : null}

              {data?.pages.map((group, i) => {
                return (
                  <Fragment key={i}>
                    {group.docs?.map((post) => (
                      <div className="card mb-4" key={post._id}>
                        <img
                          className="card-img-top"
                          src={post.imageUrl}
                          alt={post.title}
                        />
                        <div className="card-body">
                          <div className="small text-muted">
                            {post.createAt}
                          </div>
                          <h2 className="card-title">{post.title}</h2>
                          <p className="card-text">{post.description}</p>
                          <NavLink
                            to={`/post/${post.slug}`}
                            className="btn btn-primary"
                          >
                            Read more →
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                );
              })}

              {hasNextPage ? (
                <div className="mt-3 mb-3">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => fetchNextPage()}
                    >
                      Load More
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <Sidebar />
          </div>
        </div>
      </BlogLayout>
    </div>
  );
};
