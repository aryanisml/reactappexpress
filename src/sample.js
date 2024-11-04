// react-client/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme, Container, Typography, Button } from "@mui/material";
import { withTheme } from "@rjsf/core";
import { Theme as MaterialUITheme } from "@rjsf/material-ui";
import { schema, uiSchema } from "./formSchema";

const Form = withTheme(MaterialUITheme);
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#dc004e"
    }
  }
});

function App() {
  const [users, setUsers] = useState([]);
  const handleSubmit = ({ formData }) => {
    console.log("Form submitted:", formData);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5030/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
        <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Dynamic User Registration Form
        </Typography>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmit}
          liveValidate
          children={<Button type="submit" variant="contained" color="primary">Submit</Button>}
        />
      </Container>
    </ThemeProvider>
    </>

  );
}

export default sample;
