require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");
const categoryRoutes = require("./routes/category.routes.js");
const paymentRoutes = require("./routes/payments.route.js");
const freeTrialRoutes = require("./routes/freeTrial.routes.js")

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
async function run() {
  try {
    app.use("/api/user", userRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api", categoryRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/payment", paymentRoutes);
    app.use("/api/free-trial",freeTrialRoutes)
    app.listen(port, () => {
      console.log(`Backend server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

run().catch(console.dir);
