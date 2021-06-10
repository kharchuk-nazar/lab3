import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/index.js'
import cors from 'cors'
import path from 'path'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', router)

app.use(express.static(path.resolve() + "/client"));

app.all('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/client/index.html'));
});

const port = process.env.PORT || 8000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        app.listen(port, () => {
            console.log(`listening on ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
