// src/formSchema.js
export const schema = {
    title: "User Registration",
    type: "object",
    required: ["name", "email", "age"],
    properties: {
      name: { type: "string", title: "Name" },
      email: { type: "string", format: "email", title: "Email" },
      age: { type: "number", title: "Age" },
      country: {
        type: "string",
        title: "Country",
        enum: ["India", "USA", "Canada"]
      },
      subscribe: { type: "boolean", title: "Subscribe to Newsletter" }
    }
  };
  
  export const uiSchema = {
    age: {
      "ui:widget": "updown" // Renders an up-down number input for age
    },
    subscribe: {
      "ui:widget": "checkbox" // Renders a checkbox for subscribe
    }
  };
  