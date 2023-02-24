import { BlogLayout, Comment } from "../../../components";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "../../../hooks/usePost";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SinglePage = () => {
  const { slug } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => await getPostBySlug(slug),
  });

  return (
    <BlogLayout>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {isLoading ? (
              <article>
                <h1 className="fw-bolder mb-1">
                  <Skeleton />
                </h1>
                <figure className="mb-4">
                  <Skeleton height={300} />
                </figure>
                <section className="mb-5">
                  <Skeleton count={7} />
                </section>
              </article>
            ) : null}

            {!isLoading ? (
              <article>
                <header className="mb-4">
                  <h1 className="fw-bolder mb-1">{data.title}</h1>
                  <div className="text-muted fst-italic mb-2">
                    {Date(data.createdAt)}
                  </div>
                  <Link to={`/category/${data.category?.name}`}>
                    <span className="badge bg-secondary text-decoration-none link-light">
                      Category : {data.category?.name}
                    </span>
                  </Link>
                </header>
                <figure className="mb-4">
                  <img
                    className="img-fluid rounded"
                    src={data.imageUrl}
                    alt={data.title}
                  />
                </figure>

                <section className="mb-5">
                  <div
                    className="fs-5 mb-4"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  ></div>
                </section>
              </article>
            ) : null}

            <Comment postId={data?._id} />
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};
