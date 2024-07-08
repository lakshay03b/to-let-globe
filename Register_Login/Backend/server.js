import express from "express"
import {connectDB} from "../Backend/config/db.js"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
