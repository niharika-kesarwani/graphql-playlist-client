import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const PORT = process.env.port || 4000;

// apollo client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `http://localhost:${PORT}/graphql`,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
