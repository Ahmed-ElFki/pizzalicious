import { FaPizzaSlice } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <SDiv>
      <SLink to={"/"}>
        <FaPizzaSlice />
        <span>Pizzalicious</span>
      </SLink>
    </SDiv>
  );
};

const SDiv = styled.div`
  z-index: 99;
  height: 1.5rem;
  width: 80vw;
  margin: 0 8%;
  display: flex;
  justify-content: flex-start;
`;

const SLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: baseline;
  font-family: "Lobster Two", sans-serif;
  margin-top: 25px;
  color: rgb(0, 0, 0);

  span {
    margin-left: 10px;
    font-size: 2.5rem;
  }

  svg {
    margin-top: 5px;
    font-size: 2.5rem;
  }

  :hover {
    cursor: pointer;
  }
`;

export default Header;
