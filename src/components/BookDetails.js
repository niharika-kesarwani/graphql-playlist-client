import { useQuery } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { getBookQuery } from "../queries/queries";

function BookDetails(props) {
  const displayBookDetails = () => {
    const {
      data: { book },
    } = props;
    if (book) {
      const {
        name,
        genre,
        author: { name: authorName, books },
      } = book;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{authorName}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {books.map((item) => {
              const { id, name } = item;
              return <li key={id}>{name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };
  return <div id="book-details">{displayBookDetails()}</div>;
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
