config/default.json should contain:

{
  "port": 3010,
  "mongoUri": "mongodb+srv://<login>:<password>@cluster0.8yxh3.mongodb.net/<databaseName>?retryWrites=true&w=majority",
  "baseUrl": "http://localhost:3010",
  "jwtSecret": "secretKey"
}
