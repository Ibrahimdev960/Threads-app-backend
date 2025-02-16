{
    "name": "threads-app-backend",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "start": "node build/index.js",
      "dev": "tsc-watch --onSuccess \"npm start\""
    },
    "dependencies": {
      "@apollo/server": "^4.11.3",
      "@types/express": "4.17.21",
      "@types/node": "^22.13.4",
      "apollo-server-express": "^3.13.0",
      "express": "^4.21.2",
      "graphql": "^16.10.0",
      "typescript": "^5.7.3"
    },
    "devDependencies": {
      "tsc-watch": "^6.2.1"
    }
  }

  ===================================
  