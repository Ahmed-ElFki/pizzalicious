import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdAddBox } from "react-icons/md";
import { AiFillMinusSquare } from "react-icons/ai";
import { ADD_ONE, DELETE_ONE, DELETE_FROM_CART } from "../Constants/Constants";
import { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";

const Checkout = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const handleTotal = () => {
    const subArray = state.map((current) => current.price * current.qte);
    setTotal(subArray.reduce((total, current) => total + current, 0));
  };

  useEffect(() => handleTotal(), []);

  return (
    <SContainer>
      <SCart>
        {state.map((current) => {
          return (
            <SCartItem>
              <img src={current.img} alt="" />
              <p style={{ width: "400px" }}>{current.name}</p>
              <p style={{ width: "100px" }}>$ {current.price}.00</p>
              <span>
                <AiFillMinusSquare
                  onClick={() => {
                    dispatch({ type: DELETE_ONE, Id: current.id });
                    handleTotal();
                  }}
                />{" "}
                {current.qte}{" "}
                <MdAddBox
                  onClick={() => {
                    dispatch({ type: ADD_ONE, Id: current.id });
                    handleTotal();
                  }}
                />
              </span>
              <p>$ {current.price * current.qte}.00</p>
              <span>
                <MdDeleteSweep
                  onClick={() => {
                    dispatch({ type: DELETE_FROM_CART, Id: current.id });
                    handleTotal();
                  }}
                />
              </span>
            </SCartItem>
          );
        })}
      </SCart>
      <SOrder>
        <p style={{ fontSize: "3rem", fontFamily: "Lobster Two" }}>
          <b>Order Summary</b>
        </p>
        <SOrderDetail>
          <span>Total</span>
          <span>${total}.00</span>
        </SOrderDetail>
        <SOrderDetail>
          <span>Discount</span>
          <span>-</span>
        </SOrderDetail>
        <SOrderDetail>
          <span>Shipping</span>
          <span>Free</span>
        </SOrderDetail>
      </SOrder>
    </SContainer>
  );
};

const SContainer = styled.div`
  margin-left: 15rem;
  margin-top: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const SCartItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;
  font-size: 2rem;
  text-align: center;
  font-family: "Lobster Two", sans-serif;
  border: 1px dotted black;
  border-radius: 0.5rem;

  svg {
    font-size: 2.5rem;

    :hover {
      cursor: pointer;
      color: red;
    }
  }

  img {
    width: 20%;
    height: auto;
    border-radius: 0.5rem;
    padding: 20px;
  }

  p:last-child {
    padding: 20px;
  }
`;

const SOrder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30rem;
  height: 400px;
  border: 1px dotted black;
  border-radius: 0.5rem;
  padding: 20px;
`;

const SOrderDetail = styled.div`
  display: flex;
  flex-direction: row;
  width: 30rem;
  font-size: 2rem;
  font-family: "Lobster Two", sans-serif;
  justify-content: space-between;
  margin-bottom: 3.5rem;
`;

export default Checkout;
