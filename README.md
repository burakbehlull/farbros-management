# Discord Multi Bot Management System

### path: 
` npm install ` or ` yarn `

` npm start ` or ` yarn start `

<br />

` recommended version ` : ` v20.16.0 `

<br />

**Features**:
- Supports multi-bot functionality.
- Supports prefix, slash, and event systems.
- Supports adding different features to each bot.
- Supports enabling/disabling features on bots.
- Supports changing the bot's prefix.

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
| **/** | Adds the bot you sent the token to the system | token, userId | POST |
| **/:id** | Finds the bot based on the given id | .. | GET |
| **/:id** | Updates bot information | name, token, prefix | PUT |
| **/:id/status** | Gets the status of the bot | .. | GET |
| **/:id/start** | Starts the bot | .. |  POST |
| **/:id/stop** | Stops the bot | .. |  POST |
| **/:id/prefix** | Updates the bot's prefix | prefix | PATCH |
| **/:id/reload** | Refreshes all commands and events | .. | POST |
| **/:id/reload/prefix** | Refreshes prefix commands | .. | POST |
| **/:id/reload/slash** | Refreshes slash commands | .. | POST |
| **/:id/reload/event** | Refreshes event commands | .. | POST |
| **/:id/status** | Set Bot Status | .. | GET |
| **/:id/presence** | Set Bot Presence | .. | POST |
| **/:id/servers** | Get Bot Servers | .. | GET |
| **/:id/server/:guildId** | Get bot by guild id data | .. | GET |

### **/features**
| Route | About | Values | Request |
| -------- | -------- | -------- | -------- |
| **/** | Pulls all features | page, limit | GET |
| **/** | Create feature | panelId, name, description, type | POST |
| **/** | Update to feature | panelId, name, description, type | PATCH |
| **/by** | Finds the feature based on the given id | panelId | POST |
| **/sync** | Pulls all commands and uploads them to the database | .. | PATCH |

### **/bot-feature**
| Route | About | Values | Request |
| -------- | -------- | -------- | -------- |
| **/** | Finds the bot feature based on the given id | page, limit, botId (query) | GET |
| **/** | Update bot enabled status | botId, featureId, status | PATCH |
| **/** | Delete bot feature | botId, featureId | DELETE |
| **/one** | Create one bot feature | botId, feature | POST |
| **/many** | Create many bot feature | botId, data | POST |

### **/messages**
| Route | About | Values | Request |
| -------- | -------- | -------- | -------- |
| **/:botId** | Pulls messages | userId, serverId, channelId, type | POST |
| **/:botId/create** | Sends messages, replies | userId, messageId, serverId, channelId, content, type, genre | POST |

