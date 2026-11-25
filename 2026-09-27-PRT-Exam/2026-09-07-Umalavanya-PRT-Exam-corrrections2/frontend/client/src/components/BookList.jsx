function BookList({ books, onEdit, onDelete }) {

  if (books.length === 0) { 
    return <p>No books found.</p>
  }

  return (
    <table className="book-table">

      <thead>

        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Category</th>
          <th>Status</th>
          <th>Added</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {books.map((b) => (

          <tr key={b._id}>

            <td>{b.title}</td>
            <td>{b.author}</td>
            <td>{b.isbn}</td>
            <td>{b.category}</td>
            <td>{b.status}</td>
            <td>{new Date(b.createdAt).toLocaleDateString()}</td>

            <td>

            <button onClick={() => onEdit(b)}>Edit</button>
            <button onClick={() => onDelete(b._id)}>Delete</button>

            </td>
          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default BookList ;