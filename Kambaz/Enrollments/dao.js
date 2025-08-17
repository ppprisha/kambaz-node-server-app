import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const newEnrollment = {_id: uuidv4(), user: userId, course: courseId}
  enrollments.push(newEnrollment);
  console.log(enrollments);
  return newEnrollment
}

export function unenrollUserInCourse(enrollmentId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter((enrollment) => enrollment._id !== enrollmentId)
  }

  export function getEnrollments() {
    return Database.enrollments;
  }