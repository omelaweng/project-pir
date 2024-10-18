
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');  // To handle file paths

// const app = express();
// const PORT = 3300;

// app.use(cors());  // Enable CORS for all routes
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (HTML, CSS, JS) from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Connect to MongoDB
// mongoose.connect('mongodb://mongodb:27017/sensorDB', {  // Change 'localhost' to 'mongodb' if using Docker
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Could not connect to MongoDB:', err));

// // Define a schema for the PIR sensor data
// const pirSchema = new mongoose.Schema({
//     motionDetected: { type: Boolean, required: true },
//     timestamp: { type: Date, default: Date.now }
// });

// // Create a model from the schema
// const PIRData = mongoose.model('PIRData', pirSchema);

// // Store the last received PIR data
// let lastPIRData = {};

// // Endpoint for handling incoming PIR sensor data
// app.post('/sensor-data', (req, res) => {
//     const motionDetected = req.body.motionDetected;

//     // Store the PIR data
//     lastPIRData = { motionDetected };

//     // Create a new PIR data document
//     const pirData = new PIRData({ motionDetected });

//     // Save the document to the database
//     pirData.save()
//         .then(() => {
//             console.log('Data saved:', lastPIRData);
//             res.send('Data received and saved to MongoDB');
//         })
//         .catch(error => {
//             console.error('Error saving data:', error);
//             res.status(500).send('Error saving data to MongoDB');
//         });
// });

// // New endpoint to serve the last PIR sensor data
// app.get('/sensor-data', (req, res) => {
//     res.json(lastPIRData);  // Return the last PIR data as JSON
// });

// // Start the server
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');  // To handle file paths

// const app = express();
// const PORT = 3300;
// const API_KEY = 'Gikhp404crZvkMJyhOOwTl7e8allm12gqLbeogFuv21j9rlK9s6qM16VcDwlkk1VJ9iUisiKDrDTYSkkRAxjq3Eu8nTIfytMXSOQxmMaDWb2XxPUuH1eY3EmRFij3Ohl';  // Set your API key here

// app.use(cors());  // Enable CORS for all routes
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (HTML, CSS, JS) from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Connect to MongoDB
// mongoose.connect('mongodb://mongodb:27017/sensorDB', {  // Change 'localhost' to 'mongodb' if using Docker
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Could not connect to MongoDB:', err));

// // Define a schema for the PIR sensor data
// const pirSchema = new mongoose.Schema({
//     motionDetected: { type: Boolean, required: true },
//     timestamp: { type: Date, default: Date.now }
// });

// // Create a model from the schema
// const PIRData = mongoose.model('PIRData', pirSchema);

// // Middleware to check API key
// app.use((req, res, next) => {
//     const apiKey = req.query.api_key || req.headers['api_key'];
//     if (apiKey !== API_KEY) {
//         return res.status(403).json({ error: 'Forbidden: Invalid API key' });
//     }
//     next();
// });

// // Endpoint for retrieving PIR data
// app.get('/sensor-data', (req, res) => {
//     PIRData.find({})
//         .sort({ timestamp: -1 })  // Sort by latest timestamp
//         .limit(10)  // Limit the number of entries (change if needed)
//         .then(data => {
//             const formattedData = data.map(entry => ({
//                 date: entry.timestamp,
//                 class: (entry.timestamp.getHours() < 12) ? 'เช้า' : 'บ่าย',  // Morning or Afternoon
//                 peopleCount: entry.motionDetected ? 1 : 0  // Assuming motionDetected = 1 person
//             }));
//             res.json(formattedData);
//         })
//         .catch(err => {
//             console.error('Error retrieving data:', err);
//             res.status(500).json({ error: 'Error retrieving data from MongoDB' });
//         });
// });

// // Start the server
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on http://192.168.137.94:${PORT}`);
// });






const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');  // To handle file paths

const app = express();
const PORT = 3300;
const API_KEY = 'Gikhp404crZvkMJyhOOwTl7e8allm12gqLbeogFuv21j9rlK9s6qM16VcDwlkk1VJ9iUisiKDrDTYSkkRAxjq3Eu8nTIfytMXSOQxmMaDWb2XxPUuH1eY3EmRFij3Ohl';  // Set your API key here

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/sensorDB', {  // Change 'localhost' to 'mongodb' if using Docker
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Define a schema for the PIR sensor data
const pirSchema = new mongoose.Schema({
    motionDetected: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create a model from the schema
const PIRData = mongoose.model('PIRData', pirSchema);

// Middleware to check API key
app.use((req, res, next) => {
    const apiKey = req.query.api_key || req.headers['api_key'];
    if (apiKey !== API_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid API key' });
    }
    next();
});

// Endpoint for retrieving PIR data
app.get('/sensor-data', (req, res) => {
    PIRData.find({})
        .sort({ timestamp: -1 })  // Sort by latest timestamp
        .limit(10)  // Limit the number of entries (change if needed)
        .then(data => {
            const formattedData = data.map(entry => ({
                date: entry.timestamp,
                class: (entry.timestamp.getHours() < 12) ? 'เช้า' : 'บ่าย',  // Morning or Afternoon
                peopleCount: entry.motionDetected ? 1 : 0  // Assuming motionDetected = 1 person
            }));
            res.json(formattedData);
        })
        .catch(err => {
            console.error('Error retrieving data:', err);
            res.status(500).json({ error: 'Error retrieving data from MongoDB' });
        });
});

// Endpoint for receiving PIR data from ESP32
app.post('/sensor-data', (req, res) => {
    const { motionDetected } = req.body;

    // Validate the motionDetected field
    if (motionDetected === undefined) {
        return res.status(400).json({ error: 'motionDetected field is required' });
    }

    // Save the data to MongoDB
    const newPIRData = new PIRData({ motionDetected });
    newPIRData.save()
        .then(() => {
            res.status(200).json({ message: 'Data saved successfully' });
        })
        .catch(err => {
            console.error('Error saving data:', err);
            res.status(500).json({ error: 'Error saving data to MongoDB' });
        });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://172.20.10.4:${PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3300;

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/room_occupancy', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Schema สำหรับบันทึกข้อมูล
// const occupancySchema = new mongoose.Schema({
//   date: { type: String, required: true },
//   totalCount: { type: Number, required: true },
// });

// // สร้าง Model สำหรับการบันทึกข้อมูล
// const OccupancyData = mongoose.model('OccupancyData', occupancySchema);

// app.use(bodyParser.json());

// // API สำหรับรับข้อมูลจาก ESP32
// app.post('/sensor-data', (req, res) => {
//   const { date, motionCount } = req.body;

//   // ตรวจสอบดูว่ามีข้อมูลในวันนั้นแล้วหรือไม่
//   OccupancyData.findOne({ date: date }, (err, existingData) => {
//     if (err) {
//       return res.status(500).send('Error checking existing data');
//     }

//     if (existingData) {
//       // หากมีข้อมูลแล้ว ให้เพิ่มจำนวนคนเข้าไป
//       existingData.totalCount += motionCount;
//       existingData.save((err) => {
//         if (err) {
//           console.log('Error saving data:', err);
//           return res.status(500).send('Error saving data');
//         }
//         console.log('Data updated successfully');
//         return res.status(200).send('Data updated');
//       });
//     } else {
//       // หากไม่มีข้อมูล ให้สร้างข้อมูลใหม่
//       const newOccupancyData = new OccupancyData({
//         date: date,
//         totalCount: motionCount,
//       });

//       newOccupancyData.save((err) => {
//         if (err) {
//           console.log('Error saving data:', err);
//           return res.status(500).send('Error saving data');
//         }
//         console.log('Data saved successfully');
//         return res.status(200).send('Data received and saved');
//       });
//     }
//   });
// });

// // API สำหรับดึงข้อมูลเพื่อแสดงในหน้าเว็บ
// app.get('/get-occupancy-data', (req, res) => {
//   OccupancyData.find({}, (err, data) => {
//     if (err) {
//       res.status(500).send('Error fetching data');
//     } else {
//       res.json(data);
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3300;

// // เชื่อมต่อ MongoDB
// mongoose.connect('mongodb://localhost:27017/room_occupancy', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // สร้าง Schema สำหรับบันทึกข้อมูล
// const occupancySchema = new mongoose.Schema({
//     date: { type: String, required: true },
//     totalCount: { type: Number, required: true },
// });

// // สร้าง Model สำหรับการบันทึกข้อมูล
// const OccupancyData = mongoose.model('OccupancyData', occupancySchema);

// app.use(bodyParser.json());

// // API สำหรับรับข้อมูลจาก ESP32
// app.post('/sensor-data', async (req, res) => {
//     const { date, motionCount } = req.body;

//     try {
//         // ตรวจสอบดูว่ามีข้อมูลในวันนั้นแล้วหรือไม่
//         const existingData = await OccupancyData.findOne({ date: date });

//         if (existingData) {
//             // หากมีข้อมูลแล้ว ให้เพิ่มจำนวนคนเข้าไป
//             existingData.totalCount += motionCount;
//             await existingData.save(); // รอให้การบันทึกเสร็จ
//             console.log('Data updated successfully');
//             return res.status(200).send('Data updated');
//         } else {
//             // หากไม่มีข้อมูล ให้สร้างข้อมูลใหม่
//             const newOccupancyData = new OccupancyData({
//                 date: date,
//                 totalCount: motionCount,
//             });

//             await newOccupancyData.save(); // รอให้การบันทึกเสร็จ
//             console.log('Data saved successfully');
//             return res.status(200).send('Data received and saved');
//         }
//     } catch (err) {
//         console.log('Error:', err);
//         return res.status(500).send('Error saving data');
//     }
// });

// // API สำหรับดึงข้อมูลเพื่อแสดงในหน้าเว็บ
// app.get('/get-occupancy-data', async (req, res) => {
//     try {
//         const data = await OccupancyData.find({});
//         res.json(data);
//     } catch (err) {
//         res.status(500).send('Error fetching data');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on http://172.20.10.4:${PORT}`);
// });
