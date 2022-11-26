import React, { useState } from "react";
import "../../css/Welcome.css";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const signUpUser = async () => {
    // eslint-disable-next-line
    const data = await axios
      .post("http://localhost:5000/users/register", {
        fullName: firstName + lastName,
        email,
        password,
      })
      .then((res) => {
        const userId = res.data.userId || null;
        const message = res.data.message || null;
        if (userId !== null && message === null) {
          localStorage.setItem("userId", userId);
          navigate("/welcome");
        } else {
          setError(true);
          setErrorMsg(res.data.message);
        }
      });
  };

  return (
    <div className="WelcomeContainer">
      <SFormContainer>
        <SForm>
          <p>Get started absolutely free.</p>
          <p>
            Already have an account? <SLink to={"/welcome"}> Sign in</SLink>
          </p>

          <Alert
            variant="filled"
            severity="error"
            sx={{
              display: error === false ? "none" : "",
              fontSize: "1rem",
              marginTop: "10px",
              marginBottom: "-20px",
            }}
          >
            {errorMsg}
          </Alert>

          <SFormName>
            <TextField
              type="text"
              label="First name"
              variant="outlined"
              required
              InputProps={{
                style: { fontSize: "1.5rem", height: 80 },
              }}
              InputLabelProps={{
                style: { fontSize: "1.3rem", marginTop: "8px" },
              }}
              sx={{
                marginTop: "50px",
                marginRight: "15px",
              }}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              type="text"
              label="Last name"
              variant="outlined"
              required
              InputProps={{
                style: { fontSize: "1.5rem", height: 80 },
              }}
              InputLabelProps={{
                style: { fontSize: "1.3rem", marginTop: "8px" },
              }}
              sx={{ marginTop: "50px" }}
              onChange={(e) => setLastName(e.target.value)}
            />
          </SFormName>

          <TextField
            type="email"
            label="Email address"
            variant="outlined"
            required
            InputProps={{
              style: { fontSize: "1.5rem", height: 80 },
            }}
            InputLabelProps={{
              style: { fontSize: "1.3rem", marginTop: "8px" },
            }}
            sx={{ marginTop: "50px", marginBottom: "25px" }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            required
            InputProps={{
              style: { fontSize: "1.5rem", height: 80 },
            }}
            InputLabelProps={{
              style: { fontSize: "1.3rem", marginTop: "8px" },
            }}
            sx={{ marginBottom: "25px" }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signUpUser}>Create Account</button>
        </SForm>
      </SFormContainer>
    </div>
  );
};

const SFormContainer = styled.div`
  position: absolute;
  right: 0%;
  width: 40rem;
  height: 100vh;
  opacity: 0.9;
  background-color: rgb(255, 255, 255);
  font-family: "Lobster Two", sans-serif;

  p:nth-child(1) {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p:nth-child(2) {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  button {
    font-family: "Lobster Two", sans-serif;
    margin-top: 15px;
    padding: 17px;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    background-color: rgb(33, 43, 54);
    color: rgb(250, 250, 250);

    :hover {
      cursor: pointer;
    }
  }
`;

const SForm = styled.div`
  position: absolute;
  bottom: 40%;
  left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

const SFormName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -25px;
`;

const SLink = styled(Link)`
  color: rgb(0, 171, 85);
  text-decoration: none;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default CreateAccount;
