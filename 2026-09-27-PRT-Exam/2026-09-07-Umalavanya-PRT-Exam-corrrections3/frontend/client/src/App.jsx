import { useState, useEffect, useCallback  } from "react" ;
import Dashboard from "./components/Dashboard";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

import { fetchBooks, 
         fetchStats, 
         createBook,
         updateBook,
        deleteBook } from "./api";

function App() {

  const [books, setBooks] = useState([]) ;
  const [stats, setStats] = useState({
    total: 0, 
    programming: 0, 
    dataScience: 0, 
    database: 0,
    webDev: 0 ,
    available: 0
  })

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState('');

  // useCallBack method to load books when the filters change

   const loadBooks = useCallback(async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (category!=='All') params.category = category;
      if (status!=='All') params.status = status;
      const res = await fetchBooks(params);
      setBooks(res.data);

    } catch (error) {
      setError(err.response?.data?.error || 'Failed to load books');
    }
  }, [search, category, status]);



  const loadStats = async () => {
    try {
      const res = await fetchStats();
      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => { 
    loadBooks(); 
  }, [loadBooks]);


  useEffect(() => {
     loadStats(); 
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingBook) {
        await updateBook(editingBook._id, data);
        setEditingBook(null);
      } else {
        await createBook(data);
      }
      await loadBooks();
      await loadStats();
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await deleteBook(id);
      await loadBooks();
      await loadStats();
    } catch (err) {
      setError(err.response?.data?.error || 'Delete failed');
    }
  };


  return (

    <div className="app">

      <h1>Library Book Management Portal</h1>

      <Dashboard stats={stats} />

      {error && <p className="err">{error}</p>}
      
      <BookForm
        onSubmit={handleSubmit}
        editingBook={editingBook}
        onCancelEdit={() => setEditingBook(null)}
      />
      <div className="filters">
        <input
          placeholder="Search "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          >
          <option>All</option>
          <option>Programming</option>
          <option>Data Science</option>
          <option>Database</option>
          <option>Web Development</option>
        </select>

        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Available</option>
          <option>Issued</option>
          <option>Reserved</option>
        </select>
      </div>

      <BookList books={books} onEdit={setEditingBook} onDelete={handleDelete} />
    </div>
  )
}

export default App ;
