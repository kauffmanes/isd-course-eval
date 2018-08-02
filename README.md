Dependencies:
1. nodejs
2. npm (should be installed with node)

If you don't have node, the steps can be found here:
https://nodejs.org/en/download/

To set up:
1. `git clone https://github.com/kauffmanes/isd-course-eval.git`
2. `cd isd-course-eval`
3. `npm install`
4. `cd www`
5. `npm install`

To start server and build UI:
1. `cd isd-course-eval` if you're not already there
2. `node app`
3. Open a new terminal window in same directory
4. `cd www`
5. `npm run build`
6. Open a browser such as Chrome or FF and go to `http://localhost:3000`

In theory, it should show the UI...
There are a few access codes already in the database for you to test.

The database:
The database is generated based on the ORM Sequelize. This is so that it syncs table structures every time you do a node build.

In order to make changes to the database, you need some type of db visualizer that supports SQLite. I am using DB Browser for SQLite (https://sqlitebrowser.org/), but dbVisualizer also works.

If you open DB Browser there will be a button at the top that says "Open Database". Select this and navigate to the isd.db file inside isd-course-eval/api/db/isd.db and select it.

This will show you all of the structures and data.

To add to the database, we have a series of API endpoint where you can perform GETs, POSTS, PUTs, etc. I am using Postman for this.

To see all of the possible routes, you can check out the folder isd-course-eval/api/routes/. An example of how to make a request is:

` ${METHOD} http://localhost:3000/api/${resource_type}`

To get all of the courses, it would be GET http://localhost:3000/api/courses. To test this, type that into the browser URL and you should get results returned if the node process (`node app`) is running.

Some other requests:
- POST http://localhost:3000/api/evaluations // creates a new evaluation
- GET http://localhost:3000/api/evaluations // gets all of the evaluations
- POST http://localhost:3000/api/professors // creates a new professor
- POST http://localhost:3000/api/professors/courses // adds a new course to a professor
- POST http://localhost:3000/api/codes // creates a new access code
  ```
  data: {
  	"accessCode": "abc123",
  	"pcId": 1
  }
  ```

- POST http://localhost:3000/api/codes/authorize // checks if a code is valid

