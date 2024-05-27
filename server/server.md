## Server Setup

### 1.Setup npm:
npm init

### 2.Install essential server packages:
npm i express dotenv nodemon

### 3.Add in package.json:
"type": "module"

## Run Entire WebApp Using Concurrently:

### Add package:
npm i concurrently

### In package.json, in scripts:
"server": "nodemon server.js",
"client": "npm run dev --prefix ../client",
"dev": "concurrently \"npm run server\" \"npm run client\""
