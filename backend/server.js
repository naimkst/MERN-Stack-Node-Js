const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require('mongoose');

//MongoDB Database connection
mongoose.connect('mongodb+srv://root:Pass.321@cluster0.5info.mongodb.net/mern', () => {
    console.log('Database Connect..!');
});

//Dot ENV Config File Path
dotenv.config({ path: "backend/.env" });

//Server Port Assign
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Is Running.. http://localhost:${process.env.PORT}`);
});

//Unhandle Promise Rejection
process.on('unhandledRejection', err => {
    console.log(err.message);

    server.close(() => {
        process.exit(1);
    })
});