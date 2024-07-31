// dot env
require("dotenv").config();
const express = require("express");
const helmet = require("helmet"); // headers => security
const useragent = require("express-useragent"); // user 
const cors = require("cors"); 
const path = require("path");
const {sequelize} = require('./src/config/db.js');
const morgan = require('morgan') // logs 
const authRoutes = require('./src/modules/auth/route.js')
// INIT EXPRESS
const app = express();
const PORT = process.env.PORT || 8000;
// EXPRESS BODY PARSER
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
// USER AGENT
app.use(useragent.express());
// HELMET
app.use(helmet());
// INIT CORS POLICY & ALLOW ALL ORIGINS
app.use(
    cors({
        origin: function (origin, callback) {
            callback(null, true)
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "language", "ngrok-skip-browser-warning"],
        exposedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "language", "ngrok-skip-browser-warning"],
        optionsSuccessStatus: 200,
    })
);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// MORGAN LOGGER SERVICE
app.use(morgan('dev'));

// INIT ENDPOINTS
app.use('/api/auth', authRoutes(express, app))

// MYSQL CONNECTION
    sequelize.authenticate().then(() => {
    console.log(`INFO [ SEQUELIZE ] Connected`);
        // SERVER STATUS CHECK (KEEP_ALIVE)
        app.get("/", (req, res) => {
            res.status(200).send({ status: 200, message: "Server is running" });
        });
        // INIT ROUTES
        app.use((req, res) => {
            return res.status(404).json({
                code: "FORBIDDEN",
                status: 404,
                message: "Provided endpoint does not exist",
                timestamp: new Date().toISOString(),
            });
        });
        // HANDLE BAD REQUESTS
        app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && "body" in err)
                res.status(400).json({
                    code: "BAD_REQUEST",
                    status: 400,
                    message: err.message,
                    timestamp: new Date().toISOString(),
                });
            else
                next(err);
        });
        app.listen(PORT, () => {
            console.log(`INFO [ EXPRESS ] Started on PORT ${PORT}`);
        });
      
}).catch((err) => {
    console.log(err);
    throw err;
});