import { useState, useEffect } from 'react';

const CATEGORIES = [
    'Programming', 
    'Data Science', 
    'Database', 
    'Web Development'
];
const STATUSES = [
    'Available', 
    'Issued', 
    'Reserved'
];

const empty = { 
    title: '', 
    author: '', 
    isbn: '', 
    category: '', 
    status: '' 
};

function BookForm({ onSubmit, editingBook, onCancelEdit }) {

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  
  useEffect(() => {

    if (editingBook) {
        
      setForm({
        title: editingBook.title,
        author: editingBook.author,
        isbn: editingBook.isbn,
        category: editingBook.category,
        status: editingBook.status,

      });
    } else {

      setForm(empty);

    }
  }, [editingBook]);

  const validate = () => {
    const e = {};

    if (!form.title.trim()) { 
        e.title = 'Book title is required'
    };

    if (!form.author.trim()) {

        e.author = 'Author name is required';
    } 

    if (!form.isbn.trim()) { 

        e.isbn = 'ISBN is required';

    }else if (!/^[0-9A-Za-z-]{10,17}$/.test(form.isbn)) {

        e.isbn = 'Invalid ISBN format';
    }
      
    if (!form.category) { 

        e.category = 'Category is required';
    }
    if (!form.status) {

        e.status = 'Status is required';
    } 
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
    

  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;
    onSubmit(form);
    if (!editingBook) setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{editingBook ? 'Edit Book' : 'Register Book'}</h2>

      <input 
            name="title" 
            placeholder="Book Title" 
            value={form.title} 
            onChange={handleChange} 
        />
      
      {errors.title && <span className="err">{errors.title}</span>}

      <input 
            name="author" 
            placeholder="Author Name" 
            value={form.author} 
            onChange={handleChange} 
        />

      {errors.author && <span className="err">{errors.author}</span>}

      <input 
            name="isbn" 
            placeholder="ISBN" 
            value={form.isbn} 
            onChange={handleChange} 
        />
      {errors.isbn && <span className="err">{errors.isbn}</span>}

      <select 
            name="category" 
            value={form.category} 
            onChange={handleChange}
        >
        <option value="">Select Category</option>
        {
            CATEGORIES.map((c) => <option key={c}>{c}</option>)
        }
      </select>
      
      {errors.category && <span className="err">{errors.category}</span>}

      <select 
            name="status" 
            value={form.status} 
            onChange={handleChange}
        >
        <option value="">Select Status</option>
        {
            STATUSES.map((s) => <option key={s}>{s}</option>)
        }
      </select>
      
      {errors.status && <span className="err">{errors.status}</span>}

      <button type="submit">
        {editingBook ? 'Update' : 'Register Book'}
      </button>


      {editingBook && <button type="button" 
                              onClick={onCancelEdit} >Cancel</button>}
    </form>
  );
} ;

export default BookForm ;