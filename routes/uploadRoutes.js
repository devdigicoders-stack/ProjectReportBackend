import express from 'express';
import { uploadSingle, uploadMultiple, handleUploadError } from '../middleware/upload.js';
import { uploadSingleFile, uploadMultipleFiles } from '../controllers/uploadController.js';

const router = express.Router();

// Single file upload
router.post('/single', (req, res, next) => {
  uploadSingle('file')(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
}, uploadSingleFile);

// Multiple files upload
router.post('/multiple', (req, res, next) => {
  uploadMultiple('files', 10)(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
}, uploadMultipleFiles);

// Upload certificate image
router.post('/certificate', (req, res, next) => {
  uploadSingle('certificateImage')(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
}, uploadSingleFile);

// Upload college logo
router.post('/college-logo', (req, res, next) => {
  uploadSingle('collegeLogo')(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
}, uploadSingleFile);

// Upload DFD diagram
router.post('/dfd-diagram', (req, res, next) => {
  uploadSingle('dfdDiagram')(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
}, uploadSingleFile);

// Upload ER diagram
router.post('/er-diagram', (req, res, next) => {
  uploadSingle('erDiagram')(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
}, uploadSingleFile);

// Upload UI screenshots
router.post('/screenshots', (req, res, next) => {
  uploadMultiple('uiScreenshots', 20)(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
}, uploadMultipleFiles);

export default router;