import express from 'express';
import cors from "cors";
import session from 'express-session';
import "dotenv/config";

import { Hello } from './Hello.js';
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from './Kambaz/Courses/routes.js';
import AssignmentRoutes from './Kambaz/Assignment/routes.js';
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL,
  })
);

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
Lab5(app);
Hello(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
