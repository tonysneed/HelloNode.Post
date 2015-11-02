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