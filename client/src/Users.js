import React from "react";
import * as styles from "./Users.module.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import User from "./User";

const USERS_QUERY = gql`
  query UsersQuery {
    customers {
      name
      email
      age
    }
  }
`;

const Users = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Users</h1>
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) return <h4>Error</h4>;
          return (
            <div>
              {data.customers.map((user, index) => (
                <User user={user} key={index} />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Users;
