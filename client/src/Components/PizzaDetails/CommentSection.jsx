import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import profileImg from "../../imgs/profile.jpg";

import Rating from "@mui/material/Rating";

import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

const CommentSection = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentsList, setCommentsList] = useState([]);
  const accountType = localStorage.getItem("accountType");
  const userId = localStorage.getItem("userId") || null;
  const navigate = useNavigate();

  const submitNewComment = async () => {
    // eslint-disable-next-line
    const comment = await axios.post(
      "http://localhost:5000/comments/register",
      {
        userId,
        productId: id,
        comment: newComment,
        rating,
      }
    );
  };

  const getPizzaComments = async () => {
    // eslint-disable-next-line
    const comments = await axios
      .post(`http://localhost:5000/comments/${id}`)
      .then((res) => setCommentsList(res.data.productComments));
  };

  const deletePizzaComment = async ({ commentId }) => {
    // eslint-disable-next-line
    const comment = await axios.delete(
      `http://localhost:5000/comments/delete/${commentId}`
    );
  };

  useEffect(() => {
    getPizzaComments();
  }, [commentsList]);

  return (
    <CommentsWrapper>
      <Rating
        name="simple-controlled"
        value={rating}
        precision={0.5}
        onChange={(e, newValue) => {
          setRating(newValue);
        }}
        sx={{
          fontSize: "3rem",
          marginBottom: "25px",
        }}
      />

      <textarea
        value={newComment}
        type="text"
        style={{
          height: "10rem",
          marginBottom: "2.5rem",
          borderRadius: ".3rem",
          fontSize: "1.5rem",
          resize: "none",
          fontFamily: "Roboto",
          fontWeight: "400",
        }}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button
        style={{
          fontFamily: "Lobster Two",
          padding: "15px",
          marginBottom: "5rem",
          fontSize: "2rem",
          cursor: "pointer",
        }}
        onClick={() => {
          if (userId === null) navigate("/welcome");
          else {
            submitNewComment();
            getPizzaComments();
            setNewComment("");
            setRating(0.5);
          }
        }}
      >
        Submit comment
      </button>

      {commentsList.map((currentComment) => {
        const deleteAction =
          userId === currentComment.userId || accountType === "Moderator";
        const editAction = userId === currentComment.userId;
        return (
          <Comment key={currentComment._id}>
            <CommentData>
              <img
                src={profileImg}
                alt=""
                style={{
                  width: "5%",
                  height: "auto",
                  borderRadius: "50%",
                  transform: "scale(0.8)",
                }}
              />
              <div>
                <Rating
                  name="half-rating-read"
                  defaultValue={currentComment.rating}
                  precision={0.5}
                  readOnly
                  sx={{ fontSize: "2rem", marginLeft: "10px" }}
                />
                <p>{currentComment.comment}</p>
              </div>
            </CommentData>

            <CommentActions>
              {deleteAction && (
                <RiDeleteBin5Line
                  onClick={() => {
                    const commentId = currentComment._id;
                    deletePizzaComment({ commentId });
                    getPizzaComments();
                  }}
                />
              )}
              {editAction && <AiFillEdit />}
            </CommentActions>
          </Comment>
        );
      })}
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div`
  font-size: 1.5rem;
  margin-top: 2.5rem;
  font-family: "Lobster Two", sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
`;

const CommentData = styled.div`
  display: flex;
  margin-left: 5px;
  p {
    margin-left: 15px;
    display: flex;
    align-items: center;
    width: 70vw;
  }
`;

const CommentActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  svg {
    font-size: 1.7rem;
    margin-right: 10px;

    :hover {
      color: #eb6440;
      cursor: pointer;
    }
  }
`;

const Comment = styled.div`
  padding: 15px;
  display: flex;
  border-radius: 0.3rem;
  box-shadow: 2px 2px 15px rgba(108, 115, 142, 0.9);
  margin-bottom: 20px;
  height: 6rem;
`;

export default CommentSection;
