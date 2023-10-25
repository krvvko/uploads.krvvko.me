const express = require('express');
const app = express();
const cfg = require('./config')
const apiRouter = require('./router/index');
const cors = require('cors');

app.use(cors());
app.use('/api', apiRouter)

app.listen(cfg.port, () => {
    console.log(`Server is running on http://localhost:${cfg.port}`);
});
