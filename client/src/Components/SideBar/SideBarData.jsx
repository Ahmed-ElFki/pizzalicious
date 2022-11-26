import { BsCart4 } from "react-icons/bs";

import { IoIosPeople } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SideBarDataMiddle = [
  {
    name: "Cart",
    icon: (
      <Link to="/checkout">
        <BsCart4 />
      </Link>
    ),
    access: "all",
  },
  {
    name: "Users",
    to: "/users",
    icon: (
      <Link
        to="/users"
        style={{
          display:
            localStorage.getItem("accountType") === "Moderator"
              ? "inline"
              : "none",
        }}
      >
        <IoIosPeople />
      </Link>
    ),
    access: "Moderator",
  },
  {
    name: "Feedback",
    to: "/feedback",
    icon: (
      <Link to="/Feedback">
        <FaCommentDots />
      </Link>
    ),
    access: "all",
  },
];
