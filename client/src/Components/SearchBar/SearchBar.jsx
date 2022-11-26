import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("You submit");
  };

  return (
    <SForm onSubmit={handleSubmit}>
      <BsSearch />
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </SForm>
  );
};

const SForm = styled.form`
  position: relative;
  padding-bottom: 5rem;
  margin: 8rem 8% 2.5rem 8%;

  svg {
    position: absolute;
    z-index: 2;
    font-size: 2rem;
    transform: translate(25%, 28%);
  }

  input {
    position: absolute;
    width: inherit;
    z-index: 1;
    height: 2.6rem;
    border-radius: 5rem;
    font-size: 2rem;
    padding-left: 2.5rem;
    font-family: "Lobster Two", sans-serif;
    width: 84vw;
  }
`;

export default SearchBar;
