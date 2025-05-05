1. Clone the Repository

   https://github.com/alvinjr11/RealtimeDashboard1.git
   cd your-repo-name

2. Install dependencies
  For Backend
   cd server
   npm install

  For Frontend 
   cd ../client
   npm install

3.   3. Configure environment variables
Backend (server/.env)

MONGODb_URI=mongodb+srv://aloshmathew4:4LEywHO8hGUs4zlv@cluster0.mmsvbdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MAIL_USER=alvinmathew17@gmail.com
MAIL_PASS=zplgzduamtdwzkcc
JWT_SECRET="QKSMDJDNNFHHFHJMSNJENNMSMSJDNNDHDHDDDDDFF"
FRONTEND_URL=http://localhost:5173

Frontend (client/.env)

VITE_API_BASE_URL=http://localhost:5000

4. Start the servers
   Backend

    cd server
    npm run dev

   Frontend

   cd ../client
   npm run dev

5. Start the sensor simulator

   cd server
   npm run simulate-data


     
