const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const resumeRoutes = require('./routes/resumeRoutes');
console.log('Resume routes path:', require.resolve('./routes/resumeRoutes'));
// Ensure the path is correct and the file exists
dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://resu-mind-kll4vob6a-vishal-jats-projects-9cf473bc.vercel.app',
  credentials: true
}));
app.use(express.json());

app.get('/check', (req, res) => {
    res.send("Server is up and running!");
  });
// Connect to MongoDB (if needed, otherwise remove this part)  

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('Mongo Error:', err));

app.use('/api/resume', require('./routes/resumeRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
