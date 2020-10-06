const WebSocket = require("ws");
const clients = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);

    ws.on("message", (resp) => {
      if (resp.length < 3) quantity = parseInt(resp);
      else sendMessages(resp, quantity);
    });
  });

  const sendMessages = (resp, quantity) => {
    let limit = quantity > clients.length ? clients.length : quantity;
    if (quantity > 0) {
      for (let i = 0; i < limit; i++) clients[i].send(resp);
    } else clients.forEach((client) => client.send(resp));
  };
};

exports.wsConnection = wsConnection;
