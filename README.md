# Module 18 Challenge Project - NoSQL Challenge: Social Networkl API
This program is an NoSQL database, using MongoDB to internally manage the data. The server runs on a localhost:3001 and allows you to run a PUT, GET, DELETE, POST via insomnia. Please take time to listen to the walkthrough video that shows how to add, remove and update data to this social network. 


## Running the Social Network API
* From the Terminal prompt, in this projects main folder, type "node ./server.js". This starts the application that will be running on localhost:30001 while the user can minipulate data using insomnia. I've created the following, for a lack of terms, tables that manage and cross reference into one another:

    - Users

        * DEL  - You can remove an user by id.
        * PUT  - Update user(s) 
        * GET  - Display all users in the table.
        * GET  - You can also get a user by the Id.
        * POST - Create a new user or users by JSON format.

        * Field Layout for Users:
            - username      : Format - string, unique, required entry, and trimmed
            - email         : Format - string, unique, required entry, and must match a valid email address.
            - thoughts      : Format - array of Id's referencing the Thought model.
            - friends       : Format - array of Id's referencing the User model.
            - friendCount   : Format - virtual that shows the number of friends for a user.


    - Reactions

        * DEL  - You can remove an reaction by id.
        * POST - Create a new reaction or reactions by JSON format.

        * Field Layout for Reactions:
            - reactionId    : Format - objectId, default - new ObjectId.
            - reactionBody  : Format - string, required entry, and has a maximum number of 28 characters.
            - username      : Format - string, required entry.
            - createdAt     : Format - date, default = now, getter method for formatting the timestamp.


    - Thoughts

        * POST - Create a new thought or thouhgts by JSON format.
        * PUT  - Update thoughts(s) 
        * GET  - Display all thoughts in the table.
        * GET  - You can also get a thought by the Id.

        * Field Layout for Reactions:
            - thoughtText   : Format - string, required entry, and must be between 1 and 280 characters.
            - createdAt     : Format - date, default = now, getter method for formatting the timestamp.
            - username      : Format - string, required entry
            - reactions     : Format - array of nested documents.
            - reactionCount : Format - virtual that shows the number of reactions for a thought.



### Special Notes:
* The server.js file is the main driver for starting the application server. Then I've created a structured layout for the javascript project itself. You will see the following folders: 
    - config : Contains the configuration settings for the mongoDB.
    - models : Houses your three different tables for Getting, Putting, Posting, and Deleting detail.
    - routes : Controllers for routing the API data accordingly.

* Packages installed for this application were:
    - MongoDB : JSON data that controls how the information is stored.
    - Mongoose : Used to work and minipulate some of the JSON/DB data. 
    - Express : Express is used to assist in running the server on localhost:3001.

* Link to walkthrough video.


### Screen Shots.
* npm start
