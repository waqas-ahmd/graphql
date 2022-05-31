import React from "react";
import * as styles from "./User.module.css";
const User = ({ user }) => {
  return (
    <div className={styles.main}>
      {user.name}, {user.age} | {user.email}
    </div>
  );
};

export default User;
