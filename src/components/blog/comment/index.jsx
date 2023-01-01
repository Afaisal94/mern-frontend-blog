import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCommentByPostId, createComment } from "../../../hooks/useComment";

function Comment(props) {
  const { postId: post } = props;
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["comments", post],
    queryFn: async () => await getCommentByPostId(post),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createComment({ comment, post });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate({ comment, post });
    setComment("");    
    console.log(comment, post)

  };

  return (
    <div>
      <section className="mb-5">
        <div className="card bg-light">
          <div className="card-body">
            {/* Comment form */}
            <form onSubmit={handleSubmit} className="mb-4">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Join the discussion and leave a comment!"
                name="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <input
                className="btn btn-primary mt-2"
                type="submit"
                value="Submit Comment"
              />
            </form>

            {/* Comment List */}
            {data?.map((c) => {
              return (
                <div className="d-flex mb-3" key={c._id} style={{backgroundColor:'white', borderRadius: '5px'}}>
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-circle"
                      src="https://www.pngitem.com/pimgs/m/391-3918613_personal-service-platform-person-icon-circle-png-transparent.png"
                      alt="..."
                      style={{width: '30px', height: '30px'}}
                    />
                  </div>
                  <div className="ms-3">{c.comment}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Comment;
