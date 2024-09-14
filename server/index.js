// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv'
// import sheetsRouter from './routes/sheetsRoutes.js'


// dotenv.config();
// const {CORS_ORIGIN} = process.env;

// const app = express();

// app.use(cors({ origin: CORS_ORIGIN }));
// app.use(express.json());


// app.use('/sheets', sheetsRouter);


// app.listen(PORT, () => {
// 	console.log(`Server is listening on ${PORT}.`);
// });
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import multer from 'multer';
import PdfSchema from './pdfDetails.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

//mongodb connection
const mongoUrl =
"mongodb+srv://wendyhu:rootroot@musicsheetlibrary.h7jqd.mongodb.net/?retryWrites=true&w=majority&appName=MusicSheetLibrary"

mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
	});

	//multer

	const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./files");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now();
		cb(null, uniqueSuffix + file.originalname);
	},
	});

	const upload = multer({ storage: storage });

	app.post("/upload-files", upload.single("file"), async (req, res) => {
	console.log(req.file);
	const title = req.body.title;
	const fileName = req.file.filename;
	try {
		await PdfSchema.create({ title: title, pdf: fileName });
		res.send({ status: "ok" });
	} catch (error) {
		res.json({ status: error });
	}
	});

	app.get("/get-files", async (req, res) => {
	try {
		const data = await PdfSchema.find({});
		res.send({ status: "ok", data: data });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
	});
	//apis
	app.get("/", async (req, res) => {
	res.send("Upload Success!");
	});

	app.listen(PORT, () => {
		console.log(`Server is listening on ${PORT}.`);
	});
