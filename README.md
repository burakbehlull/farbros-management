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
```

### **/api**
| Route | Opposite |
| -------- | -------- |
| **/bots** | Basic instructions regarding the bot |
| **/features** | Basic instructions regarding the bot's features |

### **/bot**
| Route | About | Values | Request |
| -------- | -------- | -------- | -------- |
| **/** | Lists bots | ... |  GET |
| **/** | Adds bots | token | POST |
| **/{bot_id}/start** | Starts the bot | ... |  POST |
| **/{bot_id}/stop** | Stops the bot | ... |  POST |

### **/features**
| Route | About | Values | Request |
| -------- | -------- | -------- | -------- |
| **/{bot_id}** | Adds features to the bot | name, status, value | POST |
| **/{bot_id}** | Lists features to the bot | ... | GET |
| **/{bot_id}** | Multiple updates to bot's features | features | PUT |
| **/{bot_id}** | Single update to bot's features | name, status, value | PATCH |
