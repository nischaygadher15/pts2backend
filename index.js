import express from "express";
import "dotenv/config";
import sentMailRouter from "./Routes/sentMail.js";
import cors from "cors";

let app = express();

//CORS
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello From PTS Backend</h1>");
  res.send();
});

app.post("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write("Hello From PTS Backend-POST");
  console.log(req.body);
  res.send();
});

app.use("/sentmail", sentMailRouter);

//Start Server
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Servder started on port-${port}`);
});
