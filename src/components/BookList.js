import { useQuery } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { getBooksQuery } from "../queries/queries";

//components
import BookDetails from "./BookDetails";
import { useState } from "react";

function BookList() {
  const { data, loading, error } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  if (loading) {
    return <div>Loading books...</div>;
  }
  if (error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => {
          return (
            <li key={book.id} onClick={(e) => setSelected(book.id)}>
              {book.name}
            </li>
          );
        })}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
