/* 
  Developer: Rahul Singh Dani
  Date: 2024-12-21
  Purpose: Server configuration
*/



require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Fallback to localhost
  user: process.env.DB_USER || 'root',     // Fallback to root
  password: process.env.DB_PASSWORD || '', // Fallback to empty password
  database: process.env.DB_NAME || ''      // Fallback to empty database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Set up static folder for profile picture uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload setup using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });



// Login route
// Login route

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM userdata WHERE username = ? AND password = ?';
  db.execute(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const { user_id, role } = results[0];

      if (role === 'player') {
        // Check if user_id exists in player table
        const playerQuery = 'SELECT * FROM player WHERE user_id = ?';
        db.execute(playerQuery, [user_id], (err, playerResults) => {
          if (err) {
            return res.status(500).send('Database error');
          }
          if (playerResults.length > 0) {
            const { academy_id, id } = playerResults[0];
            return res.status(200).json({ message: 'Login successful', role: 'player', academy_id, id });
          } else {
            return res.status(400).json({ message: 'Invalid player credentials' });
          }
        });
      } else if (role === 'academy') {
        // Check if user_id exists in academy table
        const academyQuery = 'SELECT * FROM academy WHERE user_id = ?';
        db.execute(academyQuery, [user_id], (err, academyResults) => {
          if (err) {
            return res.status(500).send('Database error');
          }
          if (academyResults.length > 0) {
            const { id } = academyResults[0];
            console.log("Academy Results:", academyResults[0]); // Debug log

            return res.status(200).json({ message: 'Login successful', role: 'academy', id });
          } else {
            return res.status(400).json({ message: 'Invalid academy credentials' });
          }
        });
      }
      else if (role === 'coach') {
        // Check if user_id exists in coach table
        const coachQuery = 'SELECT * FROM employee WHERE user_id = ?';
        db.execute(coachQuery, [user_id], (err, coachResults) => {
          if (err) {
            return res.status(500).send('Database error');
          }
          if (coachResults.length > 0) {
            const { academy_id, id } = coachResults[0];
            return res.status(200).json({ message: 'Login successful', role: 'coach', academy_id, id });
          } else {
            return res.status(400).json({ message: 'Invalid coach credentials' });
          }
        });
      }
      else if (role === 'admin') {
        // Admin has full access; no user_id check required
        return res.status(200).json({ message: 'Login successful', role: 'admin' });
      } else {
        return res.status(400).json({ message: 'Invalid role' });
      }
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  });
});


// this is only login code if username and password matches--
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const query = 'SELECT * FROM userdata WHERE username = ? AND password = ?';

//   db.execute(query, [username, password], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
//     if (results.length > 0) {
//       // Extract role and other details
//       const { role } = results[0];
//       res.status(200).json({ message: 'Login successful', role });
//     } else {
//       res.status(400).json({ message: 'Invalid credentials' });
//     }
//   });
// });

//---------------------------------------------------------------
// registration player register player

//add userdata table fields first then player info when he click role is player
// Endpoint: Register User
app.post("/registerUser", (req, res) => {
  const { role, username, password } = req.body;

  const query = "INSERT INTO userdata (role, username, password) VALUES (?, ?, ?)";
  db.query(query, [role, username, password], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Please use different username", error: err });
    } else {
      res.send({ userId: result.insertId });
    }
  });
});
//player section 
// Endpoint: Register Player
app.get("/api/schools", async (req, res) => {
  const query = `SELECT DISTINCT id, name FROM academy;`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching schools." });
    }
    res.json(results);
  });
});

//------------------------------------------------------------------
//Dashboard displaying All Academics
app.get('/api/dasboard', (req, res) => {
  const query = `
    SELECT DISTINCT
      a.id AS academy_id,
      a.name AS academy_name,
      a.address AS academy_address,
      a.owner_name AS academy_owner,
      a.phone_num AS academy_phone,
      a.email AS academy_email,
      a.website AS academy_website
    FROM academy a
    LEFT JOIN courses c ON a.id = c.academy_id
    LEFT JOIN employee e ON a.id = e.academy_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err });
    }
    res.json(results);
  });
});


//academic js table shows academy all info 
// Route to fetch academic all info

app.get('/api/academicy/:id', (req, res) => {
  const academyId = req.params.id;
  console.log('Academy ID:', academyId);  // Debugging line

  const query = `
    SELECT * 
    FROM academy 
    WHERE id = ?;
  `;

  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Error fetching data', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Academy not found' });
    }
    res.json(results[0]);  // Send the first result
  });
});


//----------------------------------------------------------
//coatch data 
// API route to get coaches by academy ID
app.get('/api/coaches/:academyId', (req, res) => {
  const academyId = req.params.academyId;
  const query = `
    SELECT * 
    FROM employee 
    WHERE academy_id = ?;
  `;
  db.query(query, [academyId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching coach data', error: err });
    }
    res.json(results); // Send the coach data as JSON
  });
});



//------------------
//Courses / Baches
app.get('/api/courses/:academyId', (req, res) => {
  const academyId = req.params.academyId;  // Get academyId from URL parameter

  const query = `
    SELECT * 
    FROM courses 
    WHERE academy_id = ?;
  `;

  db.query(query, [academyId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching course data', error: err });
    }
    res.json(results); // Send the course data as JSON response
  });
});
//-----------------------------------
// Endpoint to get assets by academy_id
app.get('/api/assets/:academyId', (req, res) => {
  const academyId = req.params.academyId;
  const query = 'SELECT * FROM assets WHERE academy_id = ?';

  db.query(query, [academyId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching asset data');
    }
    res.json(result);
  });
});

//----------------------------------------------------

// Endpoint to get players by academy_id
app.get('/api/players/:academyId', (req, res) => {
  const academyId = req.params.academyId;
  // const query = 'SELECT id, name, DATE_FORMAT(dob, '%d-%m-%y') AS dob, gender,  school_name, sports_expertise, address, previous_academy, father_name, mother_name, phone_number,  batch,  profile_pic FROM player WHERE academy_id = ?` ;
  const query = `
  SELECT 
    id, 
    name, 
    DATE_FORMAT(dob,'%d-%m-%y') AS dob, 
    gender, 
    school_name, 
    sports_expertise, 
    address, 
    previous_academy, 
    father_name, 
    mother_name, 
    phone_number, 
    batch, 
    profile_pic 
  FROM player 
  WHERE academy_id = ?`;

  db.query(query, [academyId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching player data');
    }
    res.json(result);
  });
});

// Serve profile images from 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//-----------------------------------------------------

//Add New Academy ------------------------------
// Endpoint to add a new academy
app.post('/api/addacademies', (req, res) => {
  const {
    name,
    address,
    owner_name,
    phone_num,
    email,

    website,
    images,
    logo,
    youtube,
    instagram,
    facebook,
    user_id,
    latitude,
    longitude,
  } = req.body;

  // Validate required fields
  if (!name || !address || !owner_name || !phone_num || !email) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Prepare the query to insert the new academy into the database
  const query = `
    INSERT INTO academy (
      name, address, owner_name, phone_num, email,
      website, images, logo, youtube, instagram, facebook, user_id,latitude,longitude
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the query
  db.query(
    query,
    [
      name,
      address,
      owner_name,
      phone_num,
      email,
      website,
      images,
      logo,
      youtube,
      instagram,
      facebook,
      user_id,
      latitude,
      longitude,
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err.stack);
        return res.status(500).json({ message: 'Failed to add academy.' });
      }

      console.log('New Academy Added:', result);
      res.status(201).json({
        message: 'Academy added successfully!',
        academyId: result.insertId, // return the ID of the inserted record
      });
    }
  );
});

// Endpoint to view all academies id
app.get('/api/academies', (req, res) => {
  const query = 'SELECT * FROM academy';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err.stack);
      return res.status(500).json({ message: 'Failed to fetch academies.' });
    }

    res.status(200).json(results);
  });
});
//--------------------------------------------------
//delete academy
// Endpoint to delete an academy by id
app.delete('/api/academies/:id', (req, res) => {
  const academyId = req.params.id;

  // Query to delete the academy from the database
  const query = 'DELETE FROM academy WHERE id = ?';

  db.query(query, [academyId], (err, result) => {
    if (err) {
      console.error('Error deleting academy:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (result.affectedRows > 0) {
      // If academy is deleted, return the academy name
      return res.json({
        success: true,
        academyName: academyId // You can adjust this if you have the name stored in the db
      });
    } else {
      // If no academy was found with that ID
      return res.status(404).json({
        success: false,
        message: 'Academy not found'
      });
    }
  });
});

//----------------------------------------------------------
//edit academy update academy
// PUT request to update academy details by ID
// Route to get the academy by ID
app.get('/api/academies/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM academy WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error fetching academy:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Academy not found' });
    }

    res.json(result[0]); // Send the academy data
  });
});

// Route to update academy by ID
app.put('/api/academies/:id', (req, res) => {
  const { id } = req.params;
  const {
    name,
    address,
    owner_name,
    phone_num,
    email,

    website,
    images,
    logo,
    youtube,
    instagram,
    facebook,
    latitude,
    longitude,
  } = req.body;

  const query = `UPDATE academy SET name = ?, address = ?, owner_name = ?, phone_num = ?, email = ?, website = ?, images = ?, logo = ?, youtube = ?, instagram = ?, facebook = ?,latitude = ? , longitude = ? WHERE id = ?`;

  db.query(query, [name, address, owner_name, phone_num, email, website, images, logo, youtube, instagram, facebook, latitude, longitude, id], (err, result) => {
    if (err) {
      console.error('Error updating academy:', err);
      return res.status(500).json({ message: 'Failed to update academy' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Academy ID not found' });
    }

    res.json({ message: 'Academy updated successfully', success: true });
  });
});
//--------------------------------------------------
// coach edit area / backend
// edit coach 
//fetch coach data here for inputs
app.get('/api/coach/:academyId/:coachId', (req, res) => {
  const { academyId, coachId } = req.params;

  const query = 'SELECT * FROM employee WHERE academy_id = ? AND id = ?';
  db.query(query, [academyId, coachId], (err, results) => {
    if (err) {
      console.error('Error fetching coach:', err);
      return res.status(500).json({ message: 'Failed to fetch coach data.' });
    }

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'Coach not found.' });
    }
  });
});

// Update coach data
// Update coach details for a specific academy and coach ID
app.put('/api/editCoach/:academyId/:coachId', (req, res) => {
  const { academyId, coachId } = req.params;
  const { coachName, designation, address, experience, phoneNumber, email, salary, salaryFrequency } = req.body;

  const updateQuery = `
    UPDATE employee 
    SET name = ?, designation = ?, address = ?, experience = ?, phone_num = ?, 
        email = ?, salary = ?, salary_frequency = ?
    WHERE academy_id = ? AND id = ?
  `;

  db.query(
    updateQuery,
    [coachName, designation, address, experience, phoneNumber, email, salary, salaryFrequency, academyId, coachId],
    (err, result) => {
      if (err) {
        console.error('Error updating coach:', err);
        return res.status(500).json({ message: 'Failed to update coach.' });
      }

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Coach updated successfully!' });
      } else {
        res.status(404).json({ message: 'Coach not found.' });
      }
    }
  );
});

//--------------------------------------------------------------------------

//------------------------------------------------------------------------
//add new coach 
app.get("/api/getUniqueCoachId", (req, res) => {
  db.query("SELECT MAX(id) AS maxId FROM employee", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching coach ID." });
    }
    // Extract the numeric part of the ID
    const maxId = results[0].maxId ? parseInt(results[0].maxId.replace("coach", "")) : 0;

    // Increment the numeric part and format it with leading zeros
    const newIdNumber = maxId + 1;
    const newCoachId = `coach${String(newIdNumber).padStart(3, "0")}`;

    res.status(200).json({ id: newCoachId });
  });
});
// Add coach API
// Create a route to add a coach
app.post("/api/addCoach/:academyId", multer().single('resume'), (req, res) => {
  const {
    name,
    designation,
    address,
    experience,
    phone_num,
    email,
    salary,
    salary_frequency,
    batch_name
  } = req.body;

  const academyId = req.params.academyId;
  const resume = req.file ? req.file.path : null;


  // Generate a new unique coach ID
  db.query("SELECT MAX(id) AS maxId FROM employee", (err, results) => {
    if (err) {
      console.error("Error fetching max coach ID:", err);
      return res.status(500).json({ message: "Failed to generate coach ID." });
    }

    const maxId = results[0].maxId ? parseInt(results[0].maxId.replace("coach", "")) : 0;
    const newCoachId = `coach${String(maxId + 1).padStart(3, "0")}`; // Generate new ID with padding

    // Insert new player data into the database
    const query = `
      INSERT INTO employee 
        (academy_id,id, name, designation, address, experience, phone_num, email, salary, salary_frequency, resume, batch_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        academyId, newCoachId, name, designation, address, experience, phone_num, email, salary, salary_frequency, resume, batch_name,

      ],
      (err, results) => {
        if (err) {
          console.error("Error adding coach:", err);
          return res.status(500).json({ message: "Failed to add coach. Please try again." });
        }
        res.status(200).json({ message: "Coach added successfully!", id: newCoachId });
      }
    );
  });
});


// Middleware for static file serving (optional, if you're serving the resume files)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//-----------------------------------------------------------------------------------------
// Delete Coach
// Endpoint to fetch coach details
app.get('/api/getCoach/:academyId/:coachId', (req, res) => {
  const { academyId, coachId } = req.params;

  const query = 'SELECT name FROM employee WHERE academy_id = ? AND id = ?';
  db.query(query, [academyId, coachId], (err, results) => {
    if (err) {
      console.error('Error fetching coach:', err);
      return res.status(500).json({ message: 'Failed to fetch coach.' });
    }

    if (results.length > 0) {
      res.status(200).json({ coachName: results[0].name });
    } else {
      res.status(404).json({ message: 'Coach not found.' });
    }
  });
});

// Endpoint to delete a coach
app.delete('/api/deleteCoach/:academyId/:coachId', (req, res) => {
  const { academyId, coachId } = req.params;

  const query = 'DELETE FROM employee WHERE academy_id = ? AND id = ?';
  db.query(query, [academyId, coachId], (err, result) => {
    if (err) {
      console.error('Error deleting coach:', err);
      return res.status(500).json({ message: 'Failed to delete coach.' });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Coach deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Coach not found.' });
    }
  });
});

//--------------------------------------------------------------

//-------------------------------------------------------------
//edit course
// Endpoint to get course details by academyId and courseId
// Fetch course data by academyId and courseId
app.get('/api/courses/:academyId/:courseId', (req, res) => {
  const { academyId, courseId } = req.params;

  const query = 'SELECT * FROM courses WHERE academy_id = ? AND course_id = ?';
  db.query(query, [academyId, courseId], (err, results) => {
    if (err) {
      console.error('Error fetching course:', err);
      return res.status(500).json({ message: 'Failed to fetch course data.' });
    }

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
  });
});

// Update course data
app.put('/api/editCourse/:academyId/:courseId', (req, res) => {
  const { academyId, courseId } = req.params;
  const { course_name, timing, fee } = req.body;

  const updateQuery =
    'UPDATE courses SET course_name = ?, timing = ?, fee = ? WHERE academy_id = ? AND course_id = ?';

  db.query(updateQuery, [course_name, timing, fee, academyId, courseId], (err, result) => {
    if (err) {
      console.error('Error updating course:', err);
      return res.status(500).json({ message: 'Failed to update course.' });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Course updated successfully!' });
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
  });
});


//-----------------------------------------------------------------
//add new course
// Endpoint to add a new course

//add new course adge code add course
app.post('/api/addCourse/:academyId', (req, res) => {
  const academyId = req.params.academyId;
  const { course_name, timing, fee } = req.body;  // Extract data from the request body

  // Generate course_id (Assuming we have a pattern like cr001, cr002...)
  const query = 'SELECT MAX(CAST(SUBSTRING(course_id, 3) AS UNSIGNED)) AS last_id FROM courses';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching last course_id:', err);
      return res.status(500).json({ message: 'Failed to generate course ID' });
    }

    // If no courses exist, default to 0
    const lastId = results[0].last_id ? results[0].last_id : 0;
    const newCourseId = `cr${String(lastId + 1).padStart(3, '0')}`;

    // Prepare the SQL INSERT query to add the new course
    const insertQuery = 'INSERT INTO courses (academy_id, course_id, course_name, timing, fee) VALUES (?, ?, ?, ?, ?)';

    db.query(insertQuery, [academyId, newCourseId, course_name, timing, fee], (err, result) => {
      if (err) {
        console.error('Error inserting course:', err);
        return res.status(500).json({ message: 'Failed to add course' });
      }

      res.status(200).json({ message: 'Course added successfully!', courseId: newCourseId });
    });
  });
});
//----------------
// fetch time from courses 
app.get('/api/getCourseTimings', async (req, res) => {
  try {
    const courseTimings = await Course.findAll(); // Adjust according to your ORM/Database query
    res.json(courseTimings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timings', error });
  }
});

//------------------------------------------------------------------

// delete course
// Delete course by academyId and courseId
app.delete('/api/deleteCourse/:academyId/:courseId', (req, res) => {
  const { academyId, courseId } = req.params;

  const query = 'DELETE FROM courses WHERE academy_id = ? AND course_id = ?';
  db.query(query, [academyId, courseId], (err, result) => {
    if (err) {
      console.error('Error deleting course:', err);
      return res.status(500).json({ message: 'Failed to delete course.' });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Course deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
  });
});

//-----------------------------------------
//----------------------------------------------------
// add a new player here 
// app.post('/api/addPlayer/:academyId', (req, res) => {
// Get distinct batch names for a specific academy
app.get("/api/getDistinctBatches/:academyId", (req, res) => {
  const { academyId } = req.params;
  db.query(
    "SELECT DISTINCT batch_name FROM employee",
    [academyId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching batches." });
      }
      res.status(200).json(results);
    }
  );
});

// Get unique player ID
app.get("/api/getUniquePlayerId", (req, res) => {
  db.query("SELECT MAX(id) AS maxId FROM player", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching player ID." });
    }
    // Extract the numeric part of the ID
    const maxId = results[0].maxId ? parseInt(results[0].maxId.replace("ply", "")) : 0;

    // Increment the numeric part and format it with leading zeros
    const newIdNumber = maxId + 1;
    const newPlayerId = `ply${String(newIdNumber).padStart(3, "0")}`;

    res.status(200).json({ id: newPlayerId });
  });
});

// Add new player
app.post("/api/addPlayer/:academyId", upload.single("profile_pic"), (req, res) => {
  const {
    name,
    dob,
    gender,
    school_name,
    sports_expertise,
    address,
    previous_academy,
    father_name,
    mother_name,
    phone_number,
    batch,
    user_id,
  } = req.body;

  const academyId = req.params.academyId;
  const profilePicPath = req.file ? req.file.path : null;

  // Generate a new unique player ID
  db.query("SELECT MAX(id) AS maxId FROM player", (err, results) => {
    if (err) {
      console.error("Error fetching max player ID:", err);
      return res.status(500).json({ message: "Failed to generate player ID." });
    }

    const maxId = results[0].maxId ? parseInt(results[0].maxId.replace("ply", "")) : 0;
    const newPlayerId = `ply${String(maxId + 1).padStart(3, "0")}`; // Generate new ID with padding

    // Insert new player data into the database
    const query = `
      INSERT INTO player (academy_id, id, name, dob, gender, school_name, sports_expertise, address, previous_academy, 
      father_name, mother_name, phone_number, batch, profile_pic ,user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query(
      query,
      [
        academyId, // academy_id
        newPlayerId, // id
        name || null, // name
        dob || null, // dob
        gender || null, // gender
        school_name || null, // school_name
        sports_expertise || null, // sports_expertise
        address || null, // address
        previous_academy || null, // previous_academy
        father_name || null, // father_name
        mother_name || null, // mother_name
        phone_number || null, // phone_number
        batch || null, // batch
        profilePicPath || null, // profile_pic
        user_id || null,
      ],
      (err, results) => {
        if (err) {
          console.error("Error adding player:", err);
          return res.status(500).json({ message: "Failed to add player. Please try again." });
        }
        res.status(200).json({ message: "Player added successfully!", id: newPlayerId });
      }
    );
  });
});

// Serve static files (profile pics)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//---------------------------------------------------------
//delete player from id 
// fetch player details from id 

app.get("/api/getPlayerDetails/:playerId", (req, res) => {
  const { playerId } = req.params;

  const query = "SELECT name FROM player WHERE id = ?";
  db.query(query, [playerId], (err, results) => {
    if (err) {
      console.error("Error fetching player details:", err);
      return res.status(500).json({ message: "Error fetching player details." });
    }
    if (results.length > 0) {
      res.status(200).json({ name: results[0].name });
    } else {
      res.status(404).json({ message: "Player not found." });
    }
  });
});

//delete player Code / endpoint
app.delete("/api/deletePlayer/:playerId", (req, res) => {
  const { playerId } = req.params;

  const query = "DELETE FROM player WHERE id = ?";
  db.query(query, [playerId], (err, results) => {
    if (err) {
      console.error("Error deleting player:", err);
      return res.status(500).json({ message: "Failed to delete player." });
    }
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Player deleted successfully." });
    } else {
      res.status(404).json({ message: "Player not found." });
    }
  });
});
//---------------------------------------------------

//edit player code 

//we are fetching batch option from add player section above 
//fetch player details 
app.get("/api/getPlayerDetails/:academyId/:playerId", (req, res) => {
  const { academyId, playerId } = req.params;

  const query = "SELECT * FROM player WHERE academy_id = ? AND id = ?";
  db.query(query, [academyId, playerId], (err, results) => {
    if (err) {
      console.error("Error fetching player details:", err);
      return res.status(500).json({ message: "Error fetching player details." });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: `Player not found in this academy.` });
    }
  });
});


//edit player endpoints / values 
app.put("/api/editPlayer/:academyId/:playerId", (req, res) => {
  const { academyId, playerId } = req.params;
  const playerData = req.body;

  const query =
    "UPDATE player SET name = ?, dob = ?, gender = ?, school_name = ?, sports_expertise = ?, address = ?, previous_academy = ?, father_name = ?, mother_name = ?, phone_number = ?, batch = ?, profile_pic = ? WHERE academy_id = ? AND id = ?";

  db.query(
    query,
    [
      playerData.name,
      playerData.dob,
      playerData.gender,
      playerData.school_name,
      playerData.sports_expertise,
      playerData.address,
      playerData.previous_academy,
      playerData.father_name,
      playerData.mother_name,
      playerData.phone_number,
      playerData.batch,
      playerData.profile_pic,
      academyId,
      playerId,
    ],
    (err, results) => {
      if (err) {
        console.error("Error updating player details:", err);
        return res.status(500).json({ message: "Failed to update player details." });
      }
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Player details updated successfully." });
      } else {
        res.status(404).json({ message: "Player not found." });
      }
    }
  );
});
//--------------------------------------------------------------


//add new asset
//add new asset adge code 
app.post('/api/addAsset/:academyId', (req, res) => {
  const academyId = req.params.academyId;
  const { assetName, quantity, cost } = req.body;  // Extract data from the request body

  // Generate asset id (Assuming we have a pattern like ass001, ass002...)
  const query = 'SELECT MAX(CAST(SUBSTRING(id, 4) AS UNSIGNED)) AS last_id FROM assets';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching last asset id:', err);
      return res.status(500).json({ message: 'Failed to generate asset ID' });
    }

    // If no asset exist, default to 0
    const lastId = results[0].last_id ? results[0].last_id : 0;
    const newAssetId = `ass${String(lastId + 1).padStart(3, '0')}`;

    // Prepare the SQL INSERT query to add the new asset
    const insertQuery = 'INSERT INTO assets (academy_id, id, name, quantity, cost) VALUES (?, ?, ?, ?, ?)';

    db.query(insertQuery, [academyId, newAssetId, assetName, quantity, cost], (err, result) => {
      if (err) {
        console.error('Error inserting asset:', err);
        return res.status(500).json({ message: 'Failed to add asset' });
      }

      res.status(200).json({ message: 'Asset added successfully!', id: newAssetId });
    });
  });
});
//------------------------------------------------------

//edit asset data
app.get('/api/assets/:academyId/:assetId', (req, res) => {
  const { academyId, assetId } = req.params;

  const query = 'SELECT * FROM assets WHERE academy_id = ? AND id = ?';
  db.query(query, [academyId, assetId], (err, results) => {
    if (err) {
      console.error('Error fetching asset:', err);
      return res.status(500).json({ message: 'Failed to fetch asset data.' });
    }

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'Asset not found.' });
    }
  });
});

// Update asset data
app.put('/api/editAsset/:academyId/:assetId', (req, res) => {
  const { academyId, assetId } = req.params;
  const { assetName, quantity, cost } = req.body;

  const updateQuery =
    'UPDATE assets SET name = ?, quantity = ?, cost = ? WHERE academy_id = ? AND id = ?';

  db.query(updateQuery, [assetName, quantity, cost, academyId, assetId], (err, result) => {
    if (err) {
      console.error('Error updating asset:', err);
      return res.status(500).json({ message: 'Failed to update asset.' });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Asset updated successfully!' });
    } else {
      res.status(404).json({ message: 'Asset not found.' });
    }
  });
});
//-------------------------------------------------

// delete asset
app.delete('/api/deleteAsset/:academyId/:assetId', (req, res) => {
  const { academyId, assetId } = req.params;

  const query = 'DELETE FROM assets WHERE academy_id = ? AND id = ?';
  db.query(query, [academyId, assetId], (err, result) => {
    if (err) {
      console.error('Error deleting asset:', err);
      return res.status(500).json({ message: 'Failed to delete asset.' });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Asset deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Asset not found.' });
    }
  });
});

//-----------------------------------------------------------
// All players Dashboard 
// fetch total players count
// Get total player count
app.get("/api/totalPlayers", (req, res) => {
  const query = "SELECT COUNT(id) AS total FROM player";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching total player count:", err);
      return res.status(500).json({ message: "Error fetching total player count." });
    }
    res.status(200).json({ total: results[0].total });
  });
});
//-------------------------------------------------------

//fetch particular player info by academy id AND id
app.get("/api/allPlayers/:academyId/:id", (req, res) => {
  const { academyId, id } = req.params;

  const query = `SELECT id , name,dob,school_name,sports_expertise,father_name, mother_name , phone_number,batch FROM player WHERE academy_id = ? AND id = ? `;
  // const query = `SELECT * FROM player WHERE academy_id = ? AND id = ? `; // it gives error on picture because it also trying to fetch picture

  db.query(query, [academyId, id], (err, results) => {
    if (err) {
      console.error("Error fetching player data: ", err);
      return res.status(500).json({ message: "Error Fetching Data." });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "Data not available." });
    }
  });
});

//-------------------------------------------------------


//get player details by search
//search by id
app.get("/api/playerDetailsById/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT id, name, batch, dob, sports_expertise, profile_pic, school_name, father_name, mother_name, phone_number 
    FROM player 
    WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching player by ID:", err);
      return res.status(500).json({ message: "Error fetching player by ID." });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "Player not found." });
    }
  });
});

//search by name 
app.get("/api/playerDetailsByName/:name", (req, res) => {
  const { name } = req.params;
  const query = `
    SELECT id, name, batch, dob, sports_expertise, profile_pic, school_name, father_name, mother_name, phone_number 
    FROM player 
    WHERE name LIKE ?`;

  db.query(query, [`%${name}%`], (err, results) => {
    if (err) {
      console.error("Error fetching player by Name:", err);
      return res.status(500).json({ message: "Error fetching player by Name." });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "Player not found." });
    }
  });
});
//-------------------------------
//financial payment management 
//fetch all financial record of player
app.get("/api/financial-records/all", (req, res) => {

  const query = ` SELECT * FROM player_financial`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// Fetch records by date range
app.get("/api/financial-records", (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "From and To dates are required." });
  }

  const query = `
    SELECT * FROM player_financial 
    WHERE due_date BETWEEN ? AND ? 
    ORDER BY due_date ASC
  `;

  db.query(query, [from, to], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});


// 2. Fetch records for this week
app.get("/api/financial-records/week", (req, res) => {
  const query = `
    SELECT * FROM player_financial 
    WHERE WEEK(due_date, 1) = WEEK(CURDATE(), 1) 
    AND YEAR(due_date) = YEAR(CURDATE())
    ORDER BY due_date ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching weekly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// 3. Fetch records for this month
app.get("/api/financial-records/month", (req, res) => {
  const query = `
    SELECT * FROM player_financial 
    WHERE MONTH(due_date) = MONTH(CURDATE()) 
    AND YEAR(due_date) = YEAR(CURDATE())
    ORDER BY due_date ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching monthly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// 4. Fetch records for this year
app.get("/api/financial-records/year", (req, res) => {
  const query = `
    SELECT * FROM player_financial 
    WHERE YEAR(due_date) = YEAR(CURDATE())
    ORDER BY due_date ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching yearly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// 5. Search by player ID or name
app.get("/api/financial-records/player", (req, res) => {
  const { playerId, playerName } = req.query;

  let query = "SELECT * FROM player_financial WHERE 1=1";
  const params = [];

  if (playerId) {
    query += " AND player_id = ?";
    params.push(playerId);
  }
  if (playerName) {
    query += " AND player_name LIKE ?";
    params.push(`%${playerName}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching player data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});
//6 not paid or pending data 
app.get("/api/financial-records/notpaid", (req, res) => {
  const query = `
    SELECT * FROM player_financial 
    WHERE status = 'not-paid' OR status = 'pending';
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching monthly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});



// delete player payment record 
// Delete a player payment record
app.delete('/api/delete-player-payment-info/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM player_financial WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting player payment record:', err);
      res.status(500).send('Error deleting player payment record');
    } else {
      res.send('Player payment record deleted successfully');
    }
  });
});
//-----------------------------------------------------------
// booking role here 
// display all assets for booking 
app.get('/assets-bookings/:academyId', (req, res) => {
  const { academyId } = req.params;
  const query = 'SELECT * FROM assets where academy_id != ?';
  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).send('Error fetching bookings');
    } else {
      res.json(results);
    }
  });
});
//---------------------------------------
//// booking role here 
// Get all bookings
app.get('/bookings/:academyId', (req, res) => {
  const { academyId } = req.params;
  const query = 'SELECT * FROM booking where academy_id = ?';
  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).send('Error fetching bookings');
    } else {
      res.json(results);
    }
  });
});

// Add a new booking
app.post('/bookings/:role/:academyId', (req, res) => {
  const { academyId } = req.params;
  const { name, date_of_booking, time, amount, customer_name, contact, status, remarks, location, image_url } = req.body;

  if (!name || !date_of_booking || !time || !amount || !customer_name || !contact || !status || !remarks || !location || !image_url) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO booking (name, date_of_booking, time, amount, customer_name, contact, status, remarks, academy_id, location, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, date_of_booking, time, amount, customer_name, contact, status, remarks, academyId, location, image_url], (err, result) => {
    if (err) {
      console.error('Error adding booking:', err);
      return res.status(500).send(`Error adding booking: ${err.message}`);
    } else {
      res.status(201).send('Booking added successfully');
    }
  });
});



// Get a single booking by ID
app.get('/bookings/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM booking WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching booking:', err);
      res.status(500).send('Error fetching booking');
    } else {
      res.json(results[0]);
    }
  });
});
// Update a booking
app.put('/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { name, date_of_booking, time, amount, customer_name, contact, status, remarks, location, image_url } = req.body;
  const query = 'UPDATE booking SET name = ?, date_of_booking = ?, time = ?, amount = ?, customer_name = ?, contact = ?, status = ?, remarks = ? , ,location = ? ,image_url = ? WHERE id = ?';
  db.query(query, [name, date_of_booking, time, amount, customer_name, contact, status, remarks, location, image_url, id], (err) => {
    if (err) {
      console.error('Error updating booking:', err);
      res.status(500).send('Error updating booking');
    } else {
      res.send('Booking updated successfully');
    }
  });
});

// Delete a booking
app.delete('/bookings/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM booking WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting booking:', err);
      res.status(500).send('Error deleting booking');
    } else {
      res.send('Booking deleted successfully');
    }
  });
});

//-------------------------------------------------

// public booking home booking 
app.get('/public-bookings', (req, res) => {

  const query = 'SELECT * FROM booking';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).send('Error fetching bookings');
    } else {
      res.json(results);
    }
  });
});

//----------------------------------------------------
//total revenue
// Total Revenue - Summing 'amount' from the booking and player_financial table
app.get("/api/booking/totalrevenue/:academyId", (req, res) => {
  const { academyId } = req.params;

  // Query for total revenue from the 'booking' table
  const bookingRevenueQuery = `
    SELECT SUM(amount) AS totalRevenue
    FROM booking
    WHERE academy_id = ? AND status='confirmed';
  `;

  // Query for total revenue from the 'player_financial' table
  const playerRevenueQuery = `
    SELECT SUM(paid_amount) AS totalRevenue
    FROM player_financial
    WHERE academy_id = ?;
  `;

  // Run both queries
  db.query(bookingRevenueQuery, [academyId], (err, bookingResults) => {
    if (err) {
      console.error("Error fetching booking revenue:", err);
      return res.status(500).json({ error: "Error fetching booking revenue" });
    }

    db.query(playerRevenueQuery, [academyId], (err, playerResults) => {
      if (err) {
        console.error("Error fetching player revenue:", err);
        return res.status(500).json({ error: "Error fetching player revenue" });
      }

      // Extract numerical values and sum them
      const bookingRevenue = parseFloat(bookingResults[0].totalRevenue || 0);
      const playerRevenue = parseFloat(playerResults[0].totalRevenue || 0);
      const totalRevenue = bookingRevenue + playerRevenue;

      // Send the total revenue as the response
      res.json({ totalRevenue });
    });
  });
});



// Total Expenses - Summing 'paid_amount' from the player_financial table
app.get("/api/player_financial/totalexpenses/:academyId", (req, res) => {
  const { academyId } = req.params;

  const query = `
    SELECT SUM(amount) AS totalExpenses
    FROM booking
    WHERE academy_id = ? AND status='confirmed';
  `;

  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching total expenses:", err);
      return res.status(500).json({ error: "Error fetching total expenses" });
    }
    const totalExpenses = results[0].totalExpenses || 0;
    res.json({ totalExpenses });
  });
});

// Account Receivable - Summing 'due_amount' from the player_financial table
app.get("/api/player_financial/acreceivable/:academyId", (req, res) => {
  const { academyId } = req.params;

  const query = `
    SELECT SUM(paid_amount) AS acReceivable
    FROM player_financial
    WHERE academy_id = ?;
  `;

  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching account receivable:", err);
      return res.status(500).json({ error: "Error fetching account receivable" });
    }
    const acReceivable = results[0].acReceivable || 0;
    res.json({ acReceivable });
  });
});
//--------------------------------------------------


// coach login dashboard

// API Endpoint: Get Specific Coach by ID
app.get('/api/coaches/:academyId/:id', (req, res) => {
  const { academyId, id } = req.params;

  const query = `
    SELECT * 
    FROM employee 
    WHERE academy_id = ? AND id = ?
  `;

  db.query(query, [academyId, id], (err, results) => {
    if (err) {
      console.error('Error fetching coach details:', err);
      return res.status(500).json({ error: 'Failed to fetch coach details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    res.json(results[0]); // Return the specific coach data
  });
});

//------------------------------------------------

// home all palyer dashboard

// Endpoint to get all players
app.get('/api/allplayer', (req, res) => {
  const academyId = req.params.academyId;
  // const query = 'SELECT id, name, DATE_FORMAT(dob, '%d-%m-%y') AS dob, gender,  school_name, sports_expertise, address, previous_academy, father_name, mother_name, phone_number,  batch,  profile_pic FROM player` ;
  const query = `
  SELECT 
    id, 
    name, 
    DATE_FORMAT(dob,'%d-%m-%y') AS dob, 
    gender, 
    school_name, 
    sports_expertise, 
    address, 
    previous_academy, 
    father_name, 
    mother_name, 
    phone_number, 
    batch, 
    profile_pic 
  FROM player `;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching player data');
    }
    res.json(result);
  });
});
//--------------------------------
// Serve static files for the React app
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all route to handle React's client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//----------------------------
//--------------------------------------------------------------
// Start server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
