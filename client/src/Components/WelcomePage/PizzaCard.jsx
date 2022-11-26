import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { ADD_TO_CART } from "../Constants/Constants";
import { useDispatch } from "react-redux";

const PizzaCard = ({ id, name, veg, price, description, img }) => {
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCart = () => {
    if (userToken && userId) {
      dispatch({ type: ADD_TO_CART, Pizza: { id, name, price, img } });
    } else navigate("/welcome");
  };

  return (
    <Card>
      <p>
        <SLink to={`/pizza/${id}`}>{name}</SLink>
      </p>
      <img src={img} alt={name} />
      <Gradient />
      <MdAddShoppingCart onClick={handleAddCart} />
      <span>{price}.00 $</span>
    </Card>
  );
};

const Card = styled.div`
  min-height: 25rem;
  width: 25rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-family: "Lobster Two", sans-serif;

  :hover {
    cursor: pointer;
    box-shadow: 2px 2px 30px rgba(255, 125, 125, 0.9);

    svg {
      position: absolute;
      z-index: 11;
      font-size: 2rem;
      background-color: rgb(255, 171, 0);
      border-radius: 50%;
      padding: 20px;
      right: 2%;
      bottom: 2%;
    }

    span {
      position: absolute;
      z-index: 11;
      top: 5%;
      left: 5%;
      font-size: 2.5rem;
      font-weight: 400;
      color: white;
    }
  }

  p {
    height: 5rem;
    position: absolute;
    z-index: 10;
    color: white;
    font-size: 2rem;
    font-weight: 400;
    bottom: 5%;
    text-align: center;

    :hover {
      text-decoration: underline;
    }
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  width: 100%;
  height: 100%;
  z-index: 9;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default PizzaCard;
