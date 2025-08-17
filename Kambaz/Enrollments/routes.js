import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {

    app.delete("/api/enrollments/:enrollmentId", (req, res) => {
        const { enrollmentId } = req.params;
        const status =  enrollmentsDao.unenrollUserInCourse(enrollmentId);
        res.send(status);
    });

    app.get("/api/enrollments", (req, res) => {
        const enrollments = enrollmentsDao.getEnrollments();
        res.send(enrollments);
      });
    }
