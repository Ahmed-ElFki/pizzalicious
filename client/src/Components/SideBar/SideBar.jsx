import styled from "styled-components";
import { SideBarDataMiddle } from "./SideBarData";
import { AiOutlinePoweroff } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  // eslint-disable-next-line
  const [loggedUserData, setLoggedUserData] = useState([]);
  const loggedUserId = localStorage.getItem("userId") || null;
  const navigate = useNavigate();

  const genUserAvatar = async () => {
    // eslint-disable-next-line
    const userData = await axios
      .post(`http://localhost:5000/users/${loggedUserId}`)
      .then((res) => setLoggedUserData(res.data.user));
  };

  useEffect(() => {
    genUserAvatar();
  }, [loggedUserId]);

  return (
    <SSideBar>
      <Avatar
        sx={{
          bgcolor: deepOrange[500],
          width: "3.5rem",
          height: "3.5rem",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginTop: ".5rem",
        }}
      ></Avatar>

      <SSideBarMiddle>
        {SideBarDataMiddle.map((menuItem) => {
          return menuItem.icon;
        })}
      </SSideBarMiddle>

      <SSideBarBottom>
        <AiOutlinePoweroff
          onClick={() => {
            localStorage.clear();
            navigate("/");
            window.location.reload();
          }}
        />
      </SSideBarBottom>
    </SSideBar>
  );
};

const SSideBar = styled.div`
  height: 100%;
  background: linear-gradient(to bottom, #7e0f4b, #1a5865);
  width: 3.5vw;
  position: fixed;
  top: 0%;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SSideBarMiddle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  svg {
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;

    :hover {
      cursor: pointer;
    }
  }
`;

const SSideBarBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  svg {
    font-size: 3rem;
    color: white;
    margin-bottom: 0.5rem;

    :hover {
      cursor: pointer;
    }
  }
`;

export default SideBar;
