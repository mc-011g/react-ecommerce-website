import express from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import path from "path";

const PORT = process.env.REACT_APP_PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use(express.static(path.join(path.resolve(), 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'build', 'index.html'));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
