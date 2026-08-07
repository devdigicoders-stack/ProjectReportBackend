import StudentForm from "../models/StudentForm.js";

// Create or update form step
export const saveFormStep = async (req, res) => {
  try {
    const { userId, step, data } = req.body;

    if (!userId || !step || !data) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, step, and data",
      });
    }

    let updateData = {};

    // Step-specific data mapping
    switch (parseInt(step)) {
      case 1:
        updateData = {
          personalDetails: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            enrollmentNumber: data.enrollmentNumber,
            certificateNumber: data.certificateNumber,
            certificateImage: data.certificateImage || null,
          },
        };
        break;
      case 2:
        updateData = { collegeInfo: data };
        break;
      case 3:
        updateData = { projectDetails: data };
        break;
      case 4:
        // Generate unique projectId
        const projectId = `DCT-${userId}`;
        updateData = {
          projectAssets: data,
          projectId,
          status: "new",
          submittedAt: new Date(),
        };
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid step number",
        });
    }

    let form = await StudentForm.findOne({ userId });

    if (!form && step === 1) {
      // Create new form draft
      form = await StudentForm.create({
        userId,
        ...updateData,
        currentStep: 2,
        status: "draft",
      });
    } else if (form) {
      // Update existing form
      form = await StudentForm.findOneAndUpdate(
        { userId },
        {
          $set: {
            ...updateData,
            currentStep: parseInt(step) + 1,
          },
        },
        { new: true }
      );
    } else if (!form && step !== 1) {
      return res.status(400).json({
        success: false,
        message: "Form not started yet. Please start from step 1.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Step saved successfully",
      form,
    });
  } catch (error) {
    console.error("Error saving form step:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get form by userId
export const getFormByUserId = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId parameter",
      });
    }

    const form = await StudentForm.findOne({ userId });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      form,
    });
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all students with filtering, sorting, and pagination
export const getAllStudents = async (req, res) => {
  try {
    const {
      status,
      search,
      college,
      dateFrom,
      dateTo,
      prints,
      page = 1,
      limit = 10,
      sortBy = "updatedAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    // Status filter
    if (status) {
      query.status = status;
      // Filter out incomplete drafts (missing projectId) when querying new students
      if (status === "new") {
        query.projectId = { $exists: true, $ne: null };
      }
    }

    // Search filter
    if (search) {
      query.$or = [
        { "personalDetails.name": { $regex: search, $options: "i" } },
        { "personalDetails.email": { $regex: search, $options: "i" } },
        {
          "personalDetails.enrollmentNumber": { $regex: search, $options: "i" },
        },
        { "personalDetails.phone": { $regex: search, $options: "i" } },
        { "collegeInfo.collegeName": { $regex: search, $options: "i" } },
        { projectId: { $regex: search, $options: "i" } },
      ];
    }

    // College filter
    if (college) {
      query["collegeInfo.collegeName"] = college;
    }

    // Date range filter
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    // Prints filter
    if (prints) {
      if (prints === "printed") {
        query.isPrint = { $gt: 0 };
      } else if (prints === "not_printed") {
        query.isPrint = 0;
      }
    }

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const [students, totalStudents] = await Promise.all([
      StudentForm.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
      StudentForm.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalStudents / parseInt(limit));
    const hasNext = parseInt(page) < totalPages;
    const hasPrev = parseInt(page) > 1;

    res.status(200).json({
      success: true,
      students,
      currentPage: parseInt(page),
      totalPages,
      totalStudents,
      hasNext,
      hasPrev,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await StudentForm.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const student = await StudentForm.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update student status
export const updateStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isRefunded, paymentDetails } = req.body;

    if (
      !status ||
      !["new", "accept", "reject", "requestForPrint", "isSendToPrint", "printed", "isSendToStudent"].includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updateFields = { status };
    if (isRefunded !== undefined) {
      updateFields.isRefunded = isRefunded;
    }
    if (paymentDetails !== undefined) {
      updateFields.paymentDetails = paymentDetails;
    }

    const student = await StudentForm.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student status updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating student status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update PDF sent status
export const updatePdfSentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { pdfSendStudent } = req.body;

    const student = await StudentForm.findByIdAndUpdate(
      id,
      { $set: { pdfSendStudent } },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PDF sent status updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating PDF sent status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await StudentForm.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get student count by status
export const getStudentCountByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const targetStatus = status || "new";
    const query = { status: targetStatus };

    if (targetStatus === "new") {
      query.projectId = { $exists: true, $ne: null };
    }

    const count = await StudentForm.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Error counting students:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get dashboard counts for all statuses
export const getDashboardCounts = async (req, res) => {
  try {
    const statuses = [
      "new",
      "accept",
      "requestForPrint",
      "isSendToPrint",
      "printed",
      "isSendToStudent",
      "reject",
    ];

    const counts = {};

    for (const status of statuses) {
      const query = { status };
      if (status === "new") {
        query.projectId = { $exists: true, $ne: null };
      }
      const count = await StudentForm.countDocuments(query);
      counts[status] = count;
    }

    res.status(200).json({
      success: true,
      counts,
    });
  } catch (error) {
    console.error("Error getting dashboard counts:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const printCount = async (req, res) => {
  try {
    const { id } = req.params;
    const stuData = await StudentForm.findById(id);
    stuData.isPrint = stuData.isPrint + 1;
    await stuData.save();

    res.status(200).json({
      success: true,
      count:stuData.isPrint
    });
  } catch (error) {
    console.error("Error getting dashboard counts:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
