const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static file
app.use(express.static(path.join(__dirname, '/public')));

// cross origin resource sharing
app.use(cors(corsOptions));

// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ 'error': '404 not found' });
    } else {
        res.type('txt').send("404 error!! Not found");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
