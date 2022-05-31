import gql from "graphql-tag";
import React, { useState } from "react";
import { useMutation } from "react-apollo";

const ADD_USER = gql`
  mutation addCustomer($name: String!, $email: String!, $age: Int!) {
    addCustomer(input: { name: $name, email: $email, age: $age }) {
      name
      email
      age
    }
  }
`;

const AddUser = () => {
  const [createVideo] = useMutation(ADD_USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(30);

  const addUser = () => {
    setName("");
    setEmail("");
    setAge(30);
    createVideo({ variables: { name, email, age } });
  };
  return (
    <div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="number"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <button onClick={addUser}>Add</button>
    </div>
  );
};

export default AddUser;
