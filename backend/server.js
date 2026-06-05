const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const hpp = require("hpp");
const morgan = require("morgan");

const connectDB = require("./config/db");

const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

const errorHandler = require("./middleware/errorHandler");
const securityHeaders = require("./middleware/securityHeaders");

dotenv.config();

connectDB();

const app = express();

app.use(
cors({
origin:
process.env.CLIENT_URL ||
"process.env.NEXT_PUBLIC_API_URL",

credentials:true
})
);

app.use(securityHeaders);

app.use(helmet());

app.use(hpp());

app.use(compression());

app.use(morgan("dev"));

const limiter = rateLimit({

windowMs:
15 * 60 * 1000,

max:100,

message:{
success:false,
message:
"Too many requests. Try again later."
}

});

app.use(limiter);

app.use(
express.json({
limit:"10mb"
})
);

const server =
http.createServer(app);

const io =
new Server(server,{

cors:{
origin:
process.env.CLIENT_URL ||
"process.env.NEXT_PUBLIC_API_URL",

methods:[
"GET",
"POST",
"PUT",
"DELETE"
]
}

});

app.set("io",io);

io.on("connection",(socket)=>{

console.log(
"Socket Connected:",
socket.id
);

socket.on(
"disconnect",
()=>{

console.log(
"Disconnected:",
socket.id
);

}
);

});

app.get("/",(req,res)=>{

res.send(
"SWAN Backend Running"
);

});

app.get(
"/health",
(req,res)=>{

res.status(200).json({

success:true,

status:"healthy",

uptime:
process.uptime(),

timestamp:
new Date()

});

}
);

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/reports",
reportRoutes
);

app.use(
"/api/dashboard",
dashboardRoutes
);

app.use(
"/api/analytics",
analyticsRoutes
);

app.use(
"/api/admin",
adminRoutes
);

app.use(errorHandler);

const PORT =
process.env.PORT || 5000;

server.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});
