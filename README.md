# Discord Multi Bot Management System

### path: 
` npm install ` or ` yarn `

` npm run dev ` or ` yarn dev `

<br />

### Create an `.env` file on the server and client side and configure it like this:
` server `
```js
PORT = 80 // WEB LOCAL PORT
MONGO_URI // MONGODB STRING
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

| Route | Opposite |
| -------- | -------- |
| **/api** | The parent endpoint of all endpoints |
| **/user** | Where operations are performed on users on the server |
| **/bots** | Where to set bot endpoints |
| **/features** | Features operations link path |
| **/bot-feature** | Bot feature adding operations |

### **/user**
| Route | About | Values | Request |
| -------- | -------- | -------- | -------- |
| **/** | login to the system | username, password | POST |
| **/** | Register to the system | username, password, email | POST |
| **/:id** | Gets the user's information | .. | GET |
| **/:userId/bots** | Fetches the user's bots | .. | GET |
| **/auth/refresh** | Creates refresh token | .. | POST |
| **/auth/verify** | Verifies user token | .. | POST |

### **/bots**
| Route | About | Values | Request |
| -------- | -------- | -------- | -------- |
| **/** | Pulls all bots | .. | GET |
| **/:id** | Finds the bot based on the given id | .. |  GET |
| **/:id/status** | Gets the status of the bot | .. |  GET |
| **/** | Adds the bot you sent the token to the system | token, userId |  POST |
| **/:id/start** | Starts the bot | .. |  POST |
| **/:id/stop** | Stops the bot | .. |  POST |
| **/:id** | Updates bot information | name, token, prefix | PUT |
| **/:id/prefix** | Updates the bot's prefix | prefix | PATCH |
| **/:id/reload** | Refreshes all commands and events | .. | POST |
| **/:id/reload/prefix** | Refreshes prefix commands | .. | POST |
| **/:id/reload/slash** | Refreshes slash commands | .. | POST |
| **/:id/reload/event** | Refreshes event commands | .. | POST |



