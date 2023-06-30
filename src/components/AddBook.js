import { useQuery, useMutation } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { flowRight as compose } from "lodash";
import { useState } from "react";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from "../queries/queries";

function AddBook() {
  const getAuthors = useQuery(getAuthorsQuery);
  const [addBook, { data, loading, error }] = useMutation(addBookMutation);
  const [formDetails, setFormDetails] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  if (getAuthors?.loading) {
    return <option disabled>Loading Authors...</option>;
  }

  if (getAuthors?.error) {
    return <option disabled>Something went wrong!</option>;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    addBook({
      variables: formDetails,
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={formSubmitHandler}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) =>
            setFormDetails({ ...formDetails, name: e.target.value })
          }
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="label"
          onChange={(e) =>
            setFormDetails({ ...formDetails, genre: e.target.value })
          }
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) =>
            setFormDetails({ ...formDetails, authorId: e.target.value })
          }
        >
          <option>Select author</option>
          {getAuthors?.data.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
