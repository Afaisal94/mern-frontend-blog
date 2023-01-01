import { BlogLayout, Header, Sidebar } from "../../../components";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsInfinite } from "../../../hooks/usePost";

export const Home = () => {
  let maxPage = 5;
  const {
    isLoading,
    status,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["posts"], getPostsInfinite, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < maxPage) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return (
    <div>
      <BlogLayout>
        <Header title={"Blog Home"} tagline={"Blog created by react js"} />
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              {isLoading ? (
                <center>
                  <h3>Loading ...</h3>
                </center>
              ) : null}

              {!isLoading && data?.pages[0].totalDocs < 1 ? (
                <center>
                  <h3>No Post Found</h3>
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

              {hasNextPage && data?.pages[0].totalDocs > 0 ? (
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
