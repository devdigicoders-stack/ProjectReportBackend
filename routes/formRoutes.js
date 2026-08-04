// import express from "express";
// import { saveFormStep, getForm } from "../controllers/formController.js";

// const router = express.Router();

// router.post("/save", saveFormStep);
// router.get("/get", getForm);

// export default router;

import express from 'express';
import {
  saveFormStep,
  getFormByUserId,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  updatePdfSentStatus,
  deleteStudent,
  getStudentCountByStatus,
  getDashboardCounts,
  printCount
} from '../controllers/formController.js';

const router = express.Router();

// Form submission routes
router.post('/form', saveFormStep);
router.get('/form', getFormByUserId);

// Student CRUD routes
router.get('/', getAllStudents);
router.get('/count', getStudentCountByStatus);
router.get('/dashboard/counts', getDashboardCounts);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

// Status update routes
router.put('/:id/status', updateStudentStatus);
router.patch('/:id/pdfSendStudent', updatePdfSentStatus);
router.patch('/:id/printcount', printCount);

export default router;