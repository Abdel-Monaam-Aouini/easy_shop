import multer from "multer";

const uploadFile = () => {
  const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
  };

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("invalid image type");

      if (isValid) {
        uploadError = null;
      }
      cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname
        .split(".")[0]
        .replace(new RegExp(" ", "g"), "_");
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}.${extension}`);
    },
  });

  return multer({ storage: storage });
};

export default uploadFile;
