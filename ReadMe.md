# Basic Node Application

## Prerequisites

1. Install Node from [nodejs.org](http://nodejs.org).

	- Also verify that **Git** is installed.
	
2. Install **Definitely Typed**.

	```shell
	npm install tsd -g
	```

3. Install **gulp**.

	```shell
	npm install gulp -g
	```

4. Download `.gitignore` file.

	```shell
	curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore -o .gitignore
	```

5. Add a `license.md` file.

	- Paste license text: `http://choosealicense.com/licenses/mit`

## Setup

1. Create *package.json* using **Node Package Manager**.

	```shell
	npm init
	```

	- Just accept the defaults for now.

2. Add the `express` package.

	```shell
	npm install express --save
	```
	
	- This will add a dependency to the package.json file.
	
3. Add express *typings*.	

	```shell
	tsd install express --save
	```

## Code

1. Add an `app.js` file.

2. Add code for using express.

	```js
	var express = require('express');
	
	var app = express();
	
	var port = process.env.PORT || 3000;
	
	app.get('/', function (req, res) {
		res.send('Welcome to my API!');
	});
	
	app.listen(port, function()
	{
		console.log('Running in port ' + port);
	});
	
	```
	
## Enable nodemon with gulp

1. Install `gulp`.

	```shell
	node install gulp --save
	```
	
2. Install `nodemon`.

	```shell
	npm install gulp-nodemon
	```
	
3. Add `gulpfile.js` to the project with the following content:

	```js
	var gulp = require('gulp'),
		nodemon = require('gulp-nodemon');
	
	gulp.task('default', function(){
		nodemon({
			script: 'app.js',
			ext: 'js',
			env: {
				PORT:8000
			},
			ignore: ['./node_modules/**']
		})
		.on('restart', function(){
			console.log('Restarting');
		});
	});
	```
	
4. Run the app usin gulp.

	```shell
	gulp
	```
	
## Enable routing for HTTP get

1. Add code to enable routing.

	```js
	var router = express.Router();
	
	router.route('/books')
		.get(function(req, res){
			var responseJson = {hello: "This is my api"};
			res.json(responseJson);
		});
		
	app.use('/api', router);
	```

2. Install mongoDB from https://www.mongodb.org.

	```shell
	brew install mongodb
	```
	
3. Launch mongodb.

	```shell
	mongod --config /usr/local/etc/mongod.conf
	```

4. Import data from `booksJson.js`.

	```shell
	mongo booksdb < booksJson.js
	```

5. Install **Robomongo** and connect to mongodb.
	- View the books collection.
	
6. Use `npm` to install `mongoose`.

	```shell
	npm install mongoose --save
	```

7. Use `tds` to add typings.

	```shell
	tsd install mongoose --save
	```

8. Add code to app.js to connect to the db using `mongoose`.

	```js
	var mongoose = require('mongoose');
	var db = mongoose.connect('mongodb://localhost/booksdb');
	```

9. Reference `bookModel.js` and use it to query books.
	- Install the Chrome extension: **JSONView**

	```js
	var query = {};
	if(req.query.genre)
	{
		query.genre = req.query.genre;
	}

	book.find(query, function(err, books){
		if(err)
			res.status(500).send(err);
		else
			res.json(books);
	})
	```
	
	- Get all books:
	http://localhost:8000/api/books

	- Get books by genre:
	http://localhost:8000/api/books?genre=Fantasy

10. Add a router to find a book by id.

	```js
	router.route('/Books/:bookId')
		.get(function (req, res) {
	
			book.findById(req.params.bookId, function (err, book) {
				if (err)
					res.status(500).send(err);
				else
					res.json(book);
			});
		});
	```
	
	- Get all a book by id:
	http://localhost:8000/api/books/563781b76dd01897d27b9a3c

