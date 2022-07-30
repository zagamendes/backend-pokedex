import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/favicon.ico", (_, res) => {
  res.end();
});

app.get("/:name", async (req, res) => {
  console.log(new Date().toISOString(), `/${req.params.name}`);
  const readable = fs.createReadStream(
    `${__dirname}/audios/${req.params.name}.wav`
  );

  await new Promise((resolve) => {
    readable.on("data", (chunk) => {
      console.log(chunk);
      res.write(chunk);
    });

    readable.on("end", () => resolve(res.end()));
  });
});

app.listen(8080, () => {
  console.log("Running");
});
