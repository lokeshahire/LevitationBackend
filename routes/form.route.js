const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const formRouter = express.Router();

const { FormModel } = require("../model/form.model");

formRouter.post("/add", async (req, res) => {
  try {
    const data = new FormModel(req.body);
    const createData = await data.save();
    res.status(201).json({ message: "success", data: createData });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "user info is not save",
      err: err.message,
    });
  }
});

formRouter.get("/", async (req, res) => {
  try {
    const data = await FormModel.find();
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
});

formRouter.post("/upload", upload.array("files", 3), async (req, res) => {
  try {
    const formId = req.body.formId; // Assuming you have a unique identifier for the form

    const files = req.files.map((file) => ({
      data: file.buffer,
      mimetype: file.mimetype,
    }));

    // Update the form document to store the uploaded files
    const updatedForm = await FormModel.findByIdAndUpdate(
      formId,
      { $push: { files: { $each: files } } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Files uploaded successfully", form: updatedForm });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error uploading files",
      err: err.message,
    });
  }
});

module.exports = { formRouter };
