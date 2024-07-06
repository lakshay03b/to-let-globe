import express from "express"
import {connectDB} from "../Backend/config/db.js"
import cors from "cors"
import bodyParser from "body-parser";


const app = express();
const PORT = 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
