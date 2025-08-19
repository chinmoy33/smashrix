const express = require("express");
const cors = require("cors");
require("dotenv").config();

const registrationRoute = require("./routes/registrationRoute");
const hostRoute = require("./routes/hostRoute");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
//app.use(cors({ origin: "http://localhost:3000" }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://smashrix.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/registration", registrationRoute);
app.use("/api/host", hostRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
