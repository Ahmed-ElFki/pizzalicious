import { useEffect, useState } from "react";
import axios from "axios";

const FeedBack = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [pizzaList, setPizzaList] = useState([]);

  const loadAllPizzas = async () => {
    const comments = await axios
      .get("http://localhost:5000/products/all")
      .then((res) => setPizzaList(res.data.productsList));
  };

  const loadAllUsers = async () => {
    const users = await axios
      .post("http://localhost:5000/users/all")
      .then((res) => setUsersList(res.data.usersList));
  };

  const loadAllComments = async () => {
    const users = await axios
      .post("http://localhost:5000/comments/all")
      .then((res) => setCommentsList(res.data.commentsList));
  };

  useEffect(() => {
    loadAllComments();
    loadAllPizzas();
  }, [commentsList, pizzaList]);

  return (
    <div>
      {console.log({ commentsList, usersList, pizzaList })}
      {commentsList.map((currentComment) => {
        const pizzaName = pizzaList.filter(
          (current) => current._id === currentComment.productId
        );
        return (
          <p>
            {pizzaName} : {currentComment.comment}
          </p>
        );
      })}
    </div>
  );
};

export default FeedBack;
