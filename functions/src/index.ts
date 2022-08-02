/* eslint-disable new-cap */
import * as functions from "firebase-functions";
import express from "express";
import fsPromises from "fs/promises";
import fs from "fs";
import cors from "cors";
const app = express();
app.use(cors());

app.get("/:name", async (req, res) => {
  const files = await fsPromises.readdir(`${__dirname}/audios/`);

  res.setHeader("content-type", "audio/wav");
  const [audioPath] = files.filter((it) =>
    it.toLowerCase().includes(req.params.name.toLowerCase())
  );

  if (!audioPath) {
    res.status(400);
    return res.end();
  }

  const readable = fs.createReadStream(`${__dirname}/audios/${audioPath}`);
  readable.pipe(res);
  return Promise.resolve(true);
});

exports.app = functions.https.onRequest(app);
