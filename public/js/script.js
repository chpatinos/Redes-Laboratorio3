const ws = new WebSocket("ws://localhost:3000");
let currentData;
let mimeType;
let hash;

let count = 3;

ws.onmessage = async (msg) => {
  if (count == 3 && !currentData) currentData = msg.data;
  else if (count == 2 && currentData) mimeType = msg.data;
  else if (count == 1 && mimeType) {
    hash = await msg.data.arrayBuffer();
    await validateData();
    count = 3;
    currentData = null;
    mimeType = null;
    hash = null;
    return;
  }
  count--;
};

const validateData = async () => {
  let dataEncrypted = await crypto.subtle.digest("SHA-256", await currentData.arrayBuffer());
  if (equal(dataEncrypted, hash)) buildBlob();
  else console.log("Error son diferentes");
};

const buildBlob = () => {
  const data = new Blob([currentData], { type: mimeType });
  const url = window.URL.createObjectURL(data);
  createDownloadBtn(url);
};

const createDownloadBtn = (url) => {
  const html = `<a href=${url} download>Archivo</a><br><br>`;
  document.querySelector(".container").innerHTML += html;
};

const equal = (buf1, buf2) => {
  if (buf1.byteLength != buf2.byteLength) return false;
  var dv1 = new Int8Array(buf1);
  var dv2 = new Int8Array(buf2);
  for (var i = 0; i != buf1.byteLength; i++) {
    if (dv1[i] != dv2[i]) return false;
  }
  return true;
}
