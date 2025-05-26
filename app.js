const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // Ensure this is required
const app = express();
const ejsmate = require('ejs-mate'); // Ensure this is required
const method = require('method-override'); // Ensure this is required
const port = 7070;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts); // Use express-ejs-layouts middleware
app.use(method('_method')); // Use method-override middleware

// Set EJS as the templating engine and configure the layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.set('layout', 'layout/boilerplate');
app.engine('ejs', ejsmate);





const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        year: 1925,
        availableCopies: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        year: 1960,
        availableCopies: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        year: 1949,
        availableCopies: 4
    }
];

// Helper function to find max id in books array
function getNextBookId() {
    if (books.length === 0) return 1;
    return Math.max(...books.map(book => book.id)) + 1;
}

const members = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        membershipDate: "2020-01-15"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        membershipDate: "2019-11-23"
    },
    {
        id: 3,
        firstName: "Alice",
        lastName: "Johnson",
        membershipDate: "2021-06-10"
    }
];


// Helper function to find max id in members array
function getNextMemberId() {
    if (members.length === 0) return 1;
    return Math.max(...members.map(member => member.id)) + 1;
}

// Routes for library management views
app.get('/dashboard', (req, res) => {
    const summary = {
        totalBooks: books.length,
        totalMembers: members.length
    };
    res.render('index', { title: 'Dashboard', summary: summary, books: books, members: members });
});

app.get('/', (req, res) => {
    const summary = {
        totalBooks: books.length,
        totalMembers: members.length
    };
    res.render('index', { title: 'Dashboard', summary: summary, books: books, members: members });
});

app.get('/books/view', (req, res) => {
    res.render('books/view', { books: books });
});

app.get('/members/view', (req, res) => {
    res.render('members/view', { members: members });
});

app.get('/members/add', (req, res) => {
    res.render('members/add');
});

app.get('/members/edit', (req, res) => {
    res.render('members/edit');
});

// POST route to add a new member
app.post('/members/add', (req, res) => {
    const { firstName, lastName, membershipDate } = req.body;
    const newMember = {
        id: getNextMemberId(),
        firstName,
        lastName,
        membershipDate
    };
    members.push(newMember);
    res.redirect('/members/view');
});

// POST route to edit an existing member
app.post('/members/edit', (req, res) => {
    const { id, firstName, lastName, membershipDate } = req.body;
    const memberId = parseInt(id);
    const member = members.find(m => m.id === memberId);
    if (member) {
        member.firstName = firstName;
        member.lastName = lastName;
        member.membershipDate = membershipDate;
    }
    res.redirect('/members/view');
});

app.get('/books/add', (req, res) => {
    res.render('books/add');
});

app.post('/books/add', (req, res) => {
    const { title, author, genre, year, availableCopies } = req.body;
    const newBook = {
        id: getNextBookId(),
        title,
        author,
        genre,
        year: parseInt(year),
        availableCopies: parseInt(availableCopies)
    };
    books.push(newBook);
    res.redirect('/books/view');
});

app.get('/books/edit', (req, res) => {
    res.render('books/edit');
});

app.post('/books/add', (req, res) => {
    const { title, author, genre, year, availableCopies } = req.body;
    const newBook = {
        id: getNextBookId(),
        title,
        author,
        genre,
        year: parseInt(year),
        availableCopies: parseInt(availableCopies)
    };
    books.push(newBook);
    res.redirect('/books/view');
});

app.post('/books/edit', (req, res) => {
    const { id, title, author, genre, year, availableCopies } = req.body;
    const bookId = parseInt(id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.year = parseInt(year);
        book.availableCopies = parseInt(availableCopies);
    }
    res.redirect('/books/view');
});

app.post('/books/edit', (req, res) => {
    const { id, title, author, genre, year, availableCopies } = req.body;
    const bookId = parseInt(id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.year = parseInt(year);
        book.availableCopies = parseInt(availableCopies);
    }
    res.redirect('/books/view');
});

app.get('/issue', (req, res) => {
    res.render('issue');
});

app.get('/return', (req, res) => {
    res.render('return');
});

app.get('/reports', (req, res) => {
    res.render('reports');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});
// Routes
app.get('/', (req, res) => {
    const summary = {
        totalBooks: books.length,
        totalMembers: members.length
    };
    res.render('index', { title: 'Dashboard', summary: summary, books: books, members: members });
});

app.get('/home', (req, res) => {
    const summary = {
        totalBooks: books.length,
        totalMembers: members.length
    };
    res.render('index', { title: 'Home', summary: summary, books: books, members: members });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});