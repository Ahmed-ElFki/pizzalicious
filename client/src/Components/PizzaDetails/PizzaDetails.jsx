import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CommentSection from "./CommentSection";

const PizzaDetails = () => {
  const { id } = useParams();
  // eslint-disable-next-line
  const [pizzaList, setPizzaList] = useState(
    JSON.parse(localStorage.getItem("PizzasArray"))
  );
  // eslint-disable-next-line
  const [currentPizza, setCurrentPizza] = useState(
    pizzaList.filter((current) => current._id === id)
  );
  const [active, setActive] = useState("description");

  return (
    <>
      <BottomWrapper>
        <button
          className={active === "description" ? "active-btn" : ""}
          onClick={() => setActive("description")}
        >
          Description
        </button>

        <button
          className={active === "comments" ? "active-btn" : ""}
          onClick={() => setActive("comments")}
        >
          Comments section
        </button>

        {active === "description" && (
          <PizzaDesc>{currentPizza[0].description}</PizzaDesc>
        )}

        {active === "comments" && <CommentSection />}
      </BottomWrapper>
    </>
  );
};

const BottomWrapper = styled.div`
  margin: 10rem 8%;

  button:nth-child(1) {
    margin-right: 1rem;
  }

  button {
    font-family: "Lobster Two", sans-serif;
    font-weight: 400;
    color: white;
    background-color: rgb(31, 31, 31);
    font-size: 1.5rem;
    padding: 15px;
    border-radius: 0.25rem;
  }

  .active-btn {
    border: 0.3rem solid #ba94d1;
  }
`;

const PizzaDesc = styled.p`
  font-size: 2.5rem;
  margin-top: 2.5rem;
  font-family: "Lobster Two", sans-serif;
  font-weight: 400;
`;

export default PizzaDetails;
