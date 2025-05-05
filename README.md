🛠️ Setup & Installation
🔗 Clone the Repository
Clone the repository from GitHub:
https://github.com/alvinjr11/RealtimeDashboard1.git
Then navigate into the project folder:
cd RealtimeDashboard1

📦 Install Dependencies
Backend:
Navigate to the server folder and install dependencies using:
cd server → npm install

Frontend:
Navigate to the client folder and install dependencies using:
cd ../client → npm install

⚙️ Configure Environment Variables
Backend (server/.env):
Create a .env file in the server folder with the following values:

MONGODb_URI: mongodb+srv://aloshmathew4:4LEywHO8hGUs4zlv@cluster0.mmsvbdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

MAIL_USER: yourmail

MAIL_PASS: your email password or app-specific password

JWT_SECRET: your JWT signing secret

FRONTEND_URL: http://localhost:5173

Frontend (client/.env):
Create a .env file in the client folder with:

VITE_API_BASE_URL: http://localhost:5000

▶️ Start the Servers
To run the backend server:
Navigate to server and run npm run dev

To run the frontend app:
Navigate to client and run npm run dev

📡 Start the Sensor Simulator
To start the real-time data simulator, run the following in the server folder:
npm run simulate-data



     
