import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `https://graphql-playlist-server-2.onrender.com/graphql`,
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
