const server = require('.');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));