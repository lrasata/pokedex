const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");
const {createHandler} = require('graphql-http/lib/use/express');

dotenv.config();

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();
app.use(cors({
    origin: [process.env.ALLOWED_ORIGIN],
    methods: ["POST"],
    credentials: false,
}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, POST'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.all('/graphql', createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
}));

// Handles error globally in Express app
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1); // Exit process with failure
    }
};

// Call the database connection function
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


