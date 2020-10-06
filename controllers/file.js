const fs = require("fs");
const mime = require("mime");
const WebSocket = require("ws");
const crypto = require("crypto");
const ws = new WebSocket("ws://localhost:3000");

const pathFile1 = "./static/file1.pdf";
const pathFile2 = "./static/file2.mp4";

exports.getFile = (req, res, next) => {
  let id = parseInt(req.query.file);
  let quantity = parseInt(req.query.quantity);
  let validQuantity = quantity && quantity > 0 ? true : false;
  if (id == 1 && validQuantity) sendWs(buildResp(pathFile1, quantity));
  else if (id == 2 && validQuantity) sendWs(buildResp(pathFile2, quantity));
  else return res.status(404).send("Not valid input");
  return res.status(200).send("Archivo " + id + " enviado correctamente a " + quantity + " aplicaciones cliente.");
};

const buildResp = (path, quantity) => {
  let data = fs.readFileSync(path);
  let hash = crypto.createHash("sha256").update(data).digest();
  let resp = { data, mimeType: mime.getType(path), hash, quantity };
  return resp;
};

const sendWs = (info) => {
  ws.send(info.quantity);
  ws.send(info.data, { binary: true });
  ws.send(info.mimeType);
  ws.send(info.hash);
};
