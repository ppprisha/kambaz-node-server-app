import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";

import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentRoutes from "./Kambaz/Assignment/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.NETLIFY_URL.replace(/\/$/, ""), // frontend URL
    credentials: true, 
  })
);

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "development" ? false : true,
  },
};
if (process.env.NODE_ENV !== "development") sessionOptions.proxy = true;

app.use(session(sessionOptions));

UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
