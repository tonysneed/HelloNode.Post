var express = require('express'),
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/booksdb');
var book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

router.route('/books')
	.get(function(req, res){
		// var responseJson = {hello: "This is my api"};
		// res.json(responseJson);
		
		// var query = req.query;
		var query = {};
        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }

		book.find(query, function(err, books){
			if(err)
				// console.log(err);
				res.status(500).send(err);
			else
				res.json(books);
		})
	});
	
router.route('/Books/:bookId')
    .get(function (req, res) {

        book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else
                res.json(book);
        });
    });
	
app.use('/api', router);

app.get('/', function (req, res) {
	res.send('Welcome to my cool API!');
});

app.listen(port, function()
{
	console.log('Running in port ' + port);
});
