const { uploadToS3, listFromS3 } = require("../service/uploadFile.service");
const fs = require("fs");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se proporcionó archivo" });
    }

    const result = await uploadToS3(req.file);
    return res.json(result);

  } catch (error) {
    console.error("Error en controller:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: "Error al subir archivo",
      details: error.message
    });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const result = await listFromS3();
    res.json(result.Contents);
  } catch (error) {
    res.status(500).json({ error: "Error listando archivos" });
  }
};

