1- Dependencias servidor

npm init -y
npm install express mysql mysql2 cors dotenv multer bcryptjs jsonwebtoken
npm install nodemon --save-dev

cd server
node server.js

2- Dependencias cliente

npx create-react-app client
cd client
npm install react-router-dom axios
