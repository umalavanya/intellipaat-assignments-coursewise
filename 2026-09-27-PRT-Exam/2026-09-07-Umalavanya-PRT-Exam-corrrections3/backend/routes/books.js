const express =  require('express') ;
const router = express.Router() ;
const Book = require('../models/Book') ;


// GET ---- for all books
router.get('/', async (req, res) => {

    try{
        const {search, category, status} = req.query ;
        const query = {} ;

        if(search) {
            query.$or = [
                {title: {$regex: search, $options: 'i'}},
                {author: {$regex: search, $options: 'i'}},
                {isbn: {$regex: search, $options: 'i'}},

            ] ;
        }

        if(category && category !== 'All') query.category = category ;
        if (status && status !== 'All') query.status = status ;

        const books = await Book.find(query).sort({createdAt: -1}) ;
        res.json(books) ;

    } catch(error){
        res.status(500).json({error: error.message}) ;
    }

}) ;

// GET dashboard stats

router.get('/stats', async (req, res) => {

  try {

    const total = await Book.countDocuments() 
    const programming = await Book.countDocuments({ category: 'Programming' }) ;
    const dataScience = await Book.countDocuments({ category: 'Data Science' }) ;
    const database = await Book.countDocuments({ category: 'Database' }) ;
    const webDev = await Book.countDocuments({ category: 'Web Development' }) ;
    const available = await Book.countDocuments({ status: 'Available' })
    res.json({ total, programming, dataScience, database, webDev, available }) ;

  } catch (error) {
    
    res.status(500).json({ error: Error.message }) ;
  }
});

// POST method

router.post('/', async (req, res) => {
  try {

    const book = await Book.create(req.body) ;
    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({ error: error.message }) ;
  }
});

//PUT Method
router.put('/:id', async (req, res) => {
  try {

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, 
        {
            new: true, runValidators: true,
        });

    if (!book) {
        return res.status(404).json({ error: 'Book not found' }) ;
    }
    res.json(book);

  } catch (error) {
    res.status(500).json({ error: error.message }) ;
  }
});



// DELETE mothod
router.delete('/:id', async (req, res) => {

  try {

    const book = await Book.findByIdAndDelete(req.params.id) ;
    if (!book) return res.status(404).json({ error: 'Book not found' }) ;
    res.json({ message: 'Book deleted' }) ;

  } catch (error) {
    res.status(500).json({ error: error.message }) ;
  }
});



module.exports = router ;
