import express from 'express';
import mongoose from 'mongoose';
import listingRoutes from './routes/listing.route.js';
import cors from 'cors';


mongoose.connect("mongodb+srv://syedibrahim:syed@cluster0.eqyk51q.mongodb.net/mern-upload?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('connnected to mongodb!');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads')); //to view file

app.listen(3000, () => {
    console.log('Server connnected to port 3000');
});

app.use('/api/listing', listingRoutes);