import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowMs: 60 * 100, //1 min
    max: 5, // limit each IP to 5 login requests per 'window' per min
    message: {
        message:
            "Too many login attempts from this IP, Please try agian after 60 second",
        handler: (req, res, next, options) => {
            res.status(options.statusCode).send(options.message);
        },
    },
    standardHeaders : true , // Return rate limit info in the 'RateLimit-*' headers
    legacyHeaders:false, //disable the 'X-rateLimit-*' headers
});


export default loginLimiter