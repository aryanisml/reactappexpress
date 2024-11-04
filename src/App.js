// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Form from '@rjsf/material-ui';
import validator from '@rjsf/validator-ajv8'; // Import the validator
import { schema, uiSchema } from './formSchema';

const theme = createMuiTheme();

function App() {

  const [users, setUsers] = useState([]);



  const handleSubmit = ({ formData }) => {
    console.log('Form submitted:', formData);
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
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Dynamic User Registration Form
        </Typography>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmit}
          liveValidate
          validator={validator} // Pass the validator here
        />
      </Container>
    </ThemeProvider>
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
    </>
  );
}

export default App;
