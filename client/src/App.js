import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddUser from "./AddUser";
import * as styles from "./App.module.css";
import Users from "./Users";

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className={styles.main}>
        <Users />
        <AddUser />
      </div>
    </ApolloProvider>
  );
}

export default App;
