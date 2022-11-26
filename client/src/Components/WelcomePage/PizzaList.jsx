import React, { useEffect, useState } from "react";
import PizzaCard from "./PizzaCard";
import styled from "styled-components";
import axios from "axios";

const PizzaList = () => {
  const [pizzasArray, setPizzasArray] = useState([]);

  const getPizzasList = async () => {
    const pizzas = localStorage.getItem("PizzasArray");

    if (pizzas) {
      setPizzasArray(JSON.parse(pizzas));
    } else {
      // eslint-disable-next-line
      const data = await axios
        .get("http://localhost:5000/products/all")
        .then((res) => {
          setPizzasArray(res.data.productsList);
          localStorage.setItem(
            "PizzasArray",
            JSON.stringify(res.data.productsList)
          );
        });
    }
  };

  useEffect(() => {
    getPizzasList();
  }, []);

  return (
    <GridWrapper>
      <Grid>
        {pizzasArray.map((current) => {
          return (
            <PizzaCard
              key={current._id}
              id={current._id}
              name={current.name}
              veg={current.veg}
              price={current.price}
              description={current.description}
              img={current.img}
            />
          );
        })}
      </Grid>
    </GridWrapper>
  );
};

const GridWrapper = styled.div`
  margin: 0 8%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 5rem;
`;

export default PizzaList;
