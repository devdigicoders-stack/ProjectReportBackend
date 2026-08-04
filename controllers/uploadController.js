import path from 'path';

export const uploadSingleFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Get the folder name from the destination path
    const fullPath = req.file.path;
    const uploadsIndex = fullPath.indexOf('uploads');
    const relativePath = fullPath.substring(uploadsIndex).replace(/\\/g, '/');
    
    // Generate URL
    const fileUrl = `${relativePath}`;

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: fileUrl,
        public_id: req.file.filename,
        original_filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: relativePath
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
};

export const uploadMultipleFiles = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedFiles = req.files.map(file => {
      const fullPath = file.path;
      const uploadsIndex = fullPath.indexOf('uploads');
      const relativePath = fullPath.substring(uploadsIndex).replace(/\\/g, '/');
      const fileUrl = `${relativePath}`;

      return {
        url: fileUrl,
        public_id: file.filename,
        original_filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: relativePath
      };
    });

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading files',
      error: error.message
    });
  }
};