import { Request, Response } from "express";
import EnrollmentRepository from "../repositories/Enrollment";
import _ from "lodash";

const EnrollmentController = {
    async createEnrollment(req: Request, res: Response) {
        try {
            const { studentID, courseID } = req.body;

            if (!studentID || !courseID) {
                return res.status(400).json({ message: "StudentID and CourseID are required" });
            }

            const result = await EnrollmentRepository.createEnrollment(studentID, courseID);

            return res.status(201).json({
                message: "Enrollment created successfully",
                data: result
            });
        } catch (error) {
            console.error("Error creating enrollment:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteEnrollment(req: Request, res: Response) {
        try {
            const { enrollmentID } = req.body;

            if (!enrollmentID) {
                return res.status(400).json({ message: "EnrollmentID is required" });
            }

            await EnrollmentRepository.deleteEnrollment(enrollmentID);

            return res.status(200).json({
                message: "Enrollment deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting enrollment:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async updateEnrollmentStatus(req: Request, res: Response) {
        try {
            const { enrollmentID, Status } = req.body;

            if (!enrollmentID) {
                return res.status(400).json({ message: "EnrollmentID is required" });
            }

            // Validate that Status is one of the allowed values
            const allowedStatuses = ['Enrolled', 'Completed', 'Dropped'];
            if (Status && !allowedStatuses.includes(Status)) {
                return res.status(400).json({
                    message: "Status must be one of: Enrolled, Completed, or Dropped"
                });
            }

            const result = await EnrollmentRepository.updateEnrollment(enrollmentID, Status);

            return res.status(200).json({
                message: "Enrollment updated successfully",
                data: result
            });
        } catch (error) {
            console.error("Error updating enrollment:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getAllEnrollmentsByStudent(req: Request, res: Response) {
        try {
            const { studentID } = req.body;

            if (!studentID) {
                return res.status(400).json({ message: "StudentID is required" });
            }

            const enrollmentsResult = await EnrollmentRepository.getAllEnrollmentsByStudent(studentID);
            console.log("Enrollments retrieved:", enrollmentsResult);

            // Extract enrollments from the nested array structure
            let enrollments = [];
            if (Array.isArray(enrollmentsResult) && enrollmentsResult.length > 0) {
                // Check if the first element is also an array (nested array)
                if (Array.isArray(enrollmentsResult[0])) {
                    enrollments = enrollmentsResult[0];
                } else {
                    enrollments = enrollmentsResult;
                }
            }

            if (!enrollments || enrollments.length === 0) {
                return res.status(200).json({
                    message: "No enrollments found for this student",
                    data: {
                        Enrolled: [],
                        Completed: [],
                        Dropped: []
                    }
                });
            }

            const groupedEnrollments = _.groupBy(enrollments, 'StatEnrollmentStatus');

            const result = {
                Enrolled: groupedEnrollments['Enrolled'] || [],
                Completed: groupedEnrollments['Completed'] || [],
                Dropped: groupedEnrollments['Dropped'] || []
            };

            return res.status(200).json({
                message: "Enrollments retrieved successfully",
                data: result
            });
        } catch (error) {
            console.error("Error retrieving enrollments:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    async getContacts(req: Request, res: Response) {
        
        try {
            const { courseID } = req.body;

            if (!courseID) {
                return res.status(400).json({ message: "CourseID is required" });
            }

            const friendsResult = await EnrollmentRepository.getContacts(courseID);
            console.log("Friends retrieved:", friendsResult);

            return res.status(200).json({
                message: "Friends retrieved successfully",
                data: friendsResult
            });
        } catch (error) {
            console.error("Error retrieving friends:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

};

export default EnrollmentController;