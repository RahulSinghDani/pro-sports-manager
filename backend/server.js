/* 
  Developer: Rahul Singh Dani
  Date: 2024-12-21
  Purpose: Server configuration
  server.js
*/

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const path = require('path');
const jwt = require("jsonwebtoken");
// const { useParams } = require('react-router-dom');
const cookieParser = require("cookie-parser");
const updateSecure = process.env.NODE_ENV === 'production';
// const bcrypt = require("bcryptjs");
const CryptoJS = require('crypto-js');

const dotenv = require("dotenv");
// const verifyToken = require("./middleware/authMiddleware");


const app = express();

const port = process.env.PORT || 5000;
// const verifyToken = require("./middleware/verifyToken");

// Middleware
// app.use(cors());

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ origin: "https://prosportsmanager.in", credentials: true }));

app.use(bodyParser.json());

const db = mysql.createPool({
  connectionLimit: 10, // Adjust the number of connections based on your needs
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || ''
});

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.REACT_APP_API_BASE_URL, // Your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Corrected JWT Token Generation Function
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1d' }); // Only `id` and `role`
};


app.use((req, res, next) => {
  console.log("Cookies received:", req.cookies);
  next();
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
      console.log("Token missing in request cookies.");
      return res.status(401).json({ message: 'Session expired. Login again.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          console.log("Invalid token:", err);
          return res.status(401).json({ message: 'Invalid or expired token' });
      }
      req.user = decoded;
      next();
  });
};

// db.connect(err => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// });

// Set up static folder for profile picture uploads
// app.use("/uploads",verifyToken , express.static(path.join(__dirname, "uploads")));
app.use("/uploads", verifyToken, express.static(path.join(__dirname, "uploads")));


// File upload setup using multer
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


//---------------------------------
//------------------------------
// Login route
// Login route
//1
// app.post('/login',async (req, res) => {
//   const { username, password } = req.body;

//   const query = 'SELECT * FROM userdata WHERE username = ? AND password = ?';
//   db.execute(query, [username, password], (err, results) => {
//     if (err) {
//       console.error("Database Error:", err);
//       return res.status(500).json({ message: 'Internal Server Error', error: err });
//     }
    

//     if (results.length > 0) {
//       const { user_id, role } = results[0];
      
//       const token = generateToken(user_id, role);

//       if (role === 'player') {
//         // Check if user_id exists in player table
//         const playerQuery = 'SELECT * FROM player WHERE user_id = ?';
//         db.execute(playerQuery, [user_id], (err, playerResults) => {
//           if (err) {
//             return res.status(500).send('Database error');
//           }
//           if (playerResults.length > 0) {
//             const { academy_id, id } = playerResults[0];

//             const token = generateToken(id,  role); // * JWT Token for player
//             res.cookie('token', token, { httpOnly: true, secure: updateSecure, sameSite: 'Strict' });
//             return res.status(200).json({ message: 'Login successful', role: 'player', academy_id, id });
//           } else {
//             return res.status(400).json({ message: 'Invalid player credentials' });
//           }
//         });
//       } else if (role === 'academy') {
//         // Check if user_id exists in academy table
//         const academyQuery = 'SELECT * FROM academy WHERE user_id = ?';
//         db.execute(academyQuery, [user_id], (err, academyResults) => {
//           if (err) {
//             return res.status(500).send('Database error');
//           }
//           if (academyResults.length > 0) {
//             const { id } = academyResults[0];
//             // console.log("Academy Results:", academyResults[0]); // Debug log
//             const token = generateToken( id, role); // * JWT Token for academy
//             res.cookie('token', token, { httpOnly: true, secure: updateSecure, sameSite: 'Strict' });
//             return res.status(200).json({ message: 'Login successful', role: 'academy', id});
//           } else {
//             return res.status(400).json({ message: 'Invalid academy credentials' });
//           }
//         });
//       }
//       else if (role === 'coach') {
//         // Check if user_id exists in coach table
//         const coachQuery = 'SELECT * FROM employee WHERE user_id = ?';
//         db.execute(coachQuery, [user_id], (err, coachResults) => {
//           if (err) {
//             return res.status(500).send('Database error');
//           }
//           if (coachResults.length > 0) {
//             const { academy_id, id } = coachResults[0];
//             const token = generateToken(id ,role); // * JWT Token for coach
//             res.cookie('token', token, { httpOnly: true, secure: updateSecure, sameSite: 'Strict' });
//             return res.status(200).json({ message: 'Login successful', role: 'coach', academy_id, id });
//           } else {
//             return res.status(400).json({ message: 'Invalid coach credentials' });
//           }
//         });
//       }
//       else if (role === 'admin') {
//         // Admin has full access; no user_id check required
//         const token = generateToken(user_id, role ); // * JWT Token for admin
//         res.cookie('token', token, { httpOnly: true, secure: updateSecure, sameSite: 'Strict' });
//         return res.status(200).json({ message: 'Login successful', role: 'admin',id: user_id});
//       } else {
//         return res.status(400).json({ message: 'Invalid role' });
//       }
//     } else {
//       res.status(400).json({ message: 'Invalid credentials' });
//     }
//   });
// });
//--
//2
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM userdata WHERE username = ? AND password = ?';
  db.execute(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: 'Internal Server Error', error: err });
    }

    if (results.length > 0) {
      const { user_id, role } = results[0];

      let roleQuery = '';
      let roleTable = '';
      if (role === 'player') {
        roleQuery = 'SELECT * FROM player WHERE user_id = ?';
        roleTable = 'player';
      } else if (role === 'academy') {
        roleQuery = 'SELECT * FROM academy WHERE user_id = ?';
        roleTable = 'academy';
      } else if (role === 'coach') {
        roleQuery = 'SELECT * FROM employee WHERE user_id = ?';
        roleTable = 'employee';
      }

      if (roleTable) {
        db.execute(roleQuery, [user_id], (err, roleResults) => {
          if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
          }
          if (roleResults.length > 0) {
            const responseData = {
              message: 'Login successful',
              role,
              id: roleResults[0].id
            };

            // Add academy_id only for player and coach
            if (role === 'player' || role === 'coach') {
              responseData.academy_id = roleResults[0].academy_id;
            }

            const roleToken = generateToken(roleResults[0].id, role);
            res.cookie('token', roleToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',  // Only secure in production
              sameSite: 'Lax',  // Use 'Lax' instead of 'Strict' for cross-origin issues
              maxAge: 24 * 60 * 60 * 1000  // 1-day expiration
          });
            return res.status(200).json(responseData);
          } else {
            return res.status(400).json({ message: `Invalid ${role} credentials` });
          }
        });
      } else if (role === 'admin') {
        const adminToken = generateToken(user_id, role);
        res.cookie('token', adminToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',  // Only secure in production
          sameSite: 'Lax',  // Use 'Lax' instead of 'Strict' for cross-origin issues
          maxAge: 24 * 60 * 60 * 1000  // 1-day expiration
      });
        return res.status(200).json({ message: 'Login successful', role, id: user_id });
      } else {
        return res.status(400).json({ message: 'Invalid role' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  });
});



//--
//3
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const query = 'SELECT * FROM userdata WHERE username = ? AND password=?';
//   db.execute(query, [username,password], (err, results) => {
//     if (err) {
//       console.error("Database Error:", err);
//       return res.status(500).json({ message: 'Internal Server Error', error: err });
//     }

//     if (results.length > 0) {
//       const { user_id, role } = results[0];
//       const token = generateToken(user_id, role);

//       let roleQuery = '';
//       let roleTable = '';
//       if (role === 'player') {
//         roleQuery = 'SELECT * FROM player WHERE user_id = ?';
//         roleTable = 'player';
//       } else if (role === 'academy') {
//         roleQuery = 'SELECT * FROM academy WHERE user_id = ?';
//         roleTable = 'academy';
//       } else if (role === 'coach') {
//         roleQuery = 'SELECT * FROM employee WHERE user_id = ?';
//         roleTable = 'employee';
//       }

//       if (roleTable) {
//         db.execute(roleQuery, [user_id], (err, roleResults) => {
//           if (err) {
//             return res.status(500).json({ message: 'Database error', error: err });
//           }
//           if (roleResults.length > 0) {
//             const { id, academy_id } = roleResults[0];
//             const roleToken = generateToken(id, role);
//             res.cookie('token', roleToken, {
//               httpOnly: true,
//               secure: process.env.NODE_ENV === 'production',
//               sameSite: 'Strict'
//             });
//             return res.status(200).json({ message: 'Login successful', role, id, academy_id });
//           } else {
//             return res.status(400).json({ message: `Invalid ${role} credentials` });
//           }
//         });
//       } else if (role === 'admin') {
//         const adminToken = generateToken(user_id, role);
//         res.cookie('token', adminToken, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === 'production',
//           sameSite: 'Strict'
//         });
//         return res.status(200).json({ message: 'Login successful', role, id: user_id });
//       } else {
//         return res.status(400).json({ message: 'Invalid role' });
//       }
//     } else {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//   });
// });

//-------------------------------------------
//---------------------------------------------------------------
//here logout 
// Logout route
app.post('/api/logout', (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use 'true' if served over HTTPS in production
    sameSite: 'Strict', // Adjust based on your requirements
    path: '/', // Ensure this matches the path used when setting the cookie
  });

  // Optionally, you can send a response indicating successful logout
  res.status(200).json({ message: 'Logout successful' });
});


//---------------------------------
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

//-----------------------------------------------------
// contact us form 
app.post('/api/contact', (req, res) => {
  const { name, email, phone_number, message } = req.body;
  const sql = 'INSERT INTO contactus (name, email, phone_number, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone_number, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Failed to submit contact form' });
      return;
    }
    res.status(200).json({ message: 'Contact form submitted successfully' });
  });
});
//---------------------------------------
//display contact us data 
app.get('/api/contactus', verifyToken, (req, res) => {
  const query = 'SELECT * FROM contactus';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});
//---------------------------------------------------------
//player section 
// Endpoint: Register Player
app.get("/api/schools",verifyToken, async (req, res) => {
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
app.get('/api/dasboard',verifyToken, (req, res) => {
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

app.get('/api/academicy/:id',verifyToken, (req, res) => {
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
app.get('/api/coaches/:academyId',verifyToken, (req, res) => {
  const academyId = req.params.academyId;
  const query = `
    SELECT * 
    FROM employee 
    WHERE academy_id = ?;
  `;
  db.query(query, [academyId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching employee data', error: err });
    }
    res.json(results); // Send the coach data as JSON
  });
});



//------------------
//Courses / Baches
app.get('/api/courses/:academyId',verifyToken, (req, res) => {
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
app.get('/api/assets/:academyId',verifyToken, (req, res) => {
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
app.get('/api/players/:academyId',verifyToken, (req, res) => {
  const academyId = req.params.academyId;
  // const query = 'SELECT id, name, DATE_FORMAT(dob, '%d-%m-%y') AS dob, gender,  school_name, sports_expertise, address, previous_academy, father_name, mother_name, phone_number,  batch,  profile_pic FROM player WHERE academy_id = ?` ;
  const query = `
  SELECT 
    *
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
// app.post('/api/addacademies',verifyToken, upload.single('images'), (req, res) => {
//   const images = req.file ? req.file.filename : null;
//   const {
//     name,
//     address,
//     owner_name,
//     phone_num,
//     email,

//     website,
//     logo,
//     youtube,
//     instagram,
//     facebook,
//     user_id,
//     latitude,
//     longitude,
//   } = req.body;

//   // Validate required fields
//   if (!name || !address || !owner_name || !phone_num || !email) {
//     return res.status(400).json({ message: 'Missing required fields.' });
//   }

//   // Prepare the query to insert the new academy into the database
//   const query = `
//     INSERT INTO academy (
//       name, address, owner_name, phone_num, email,
//       website, images, logo, youtube, instagram, facebook, user_id,latitude,longitude
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   // Execute the query
//   db.query(
//     query,
//     [ name, address, owner_name, phone_num, email, website, images,logo, youtube, instagram, facebook, user_id, latitude, longitude ],
//     (err, result) => {
//       if (err) {
//         console.error('Error inserting data into the database:', err.stack);
//         return res.status(500).json({ message: 'Failed to add academy.' });
//       }

//       console.log('New Academy Added:', result);
//       res.status(201).json({
//         message: 'Academy added successfully!',
//         academyId: result.insertId, // return the ID of the inserted record
//       });
//     }
//   );
// });
app.post('/api/addacademies', verifyToken, upload.single('images'), (req, res) => {
  const images = req.file ? req.file.filename : null;
  const {
    name,
    address,
    owner_name,
    phone_num,
    email,
    website,
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

  // Function to generate new academy id from the last one
  const generateNewId = (lastId) => {
    let newNumber = 1;
    if (lastId) {
      // Extract numeric part and increment
      const numPart = parseInt(lastId.replace('aca', ''), 10);
      newNumber = numPart + 1;
    }
    // Format as "aca" followed by a 3-digit number with leading zeros
    return 'aca' + String(newNumber).padStart(3, '0');
  };

  // Query to get the last academy id
  const getLastIdQuery = "SELECT id FROM academy WHERE id LIKE 'aca%' ORDER BY id DESC LIMIT 1";
  db.query(getLastIdQuery, (err, results) => {
    if (err) {
      console.error("Error getting last id:", err);
      return res.status(500).json({ message: "Error generating new academy id" });
    }
    
    const lastId = results.length > 0 ? results[0].id : null;
    const newAcademyId = generateNewId(lastId);

    // Prepare the query to insert the new academy, including the generated id
    const query = `
      INSERT INTO academy (
        id, name, address, owner_name, phone_num, email,
        website, images, logo, youtube, instagram, facebook, user_id, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query with newAcademyId as the first parameter
    db.query(
      query,
      [newAcademyId, name, address, owner_name, phone_num, email, website, images, logo, youtube, instagram, facebook, user_id, latitude, longitude],
      (err, result) => {
        if (err) {
          console.error('Error inserting data into the database:', err.stack);
          return res.status(500).json({ message: 'Failed to add academy.' });
        }
        console.log('New Academy Added:', result);
        res.status(201).json({
          message: 'Academy added successfully!',
          academyId: newAcademyId // Return the generated academy id
        });
      }
    );
  });
});
// -------------------------------------------------------------------
// contact us status read and unread
app.put('/api/contactus/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE contactus SET status = ? WHERE id = ?';

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ error: 'Database update failed' });
    }
    res.json({ success: true, message: 'Status updated' });
  });
});


//--------------------------------------------------------
// Route: Get news by academy_id
app.get('/api/getNews/:academyId',verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = 'SELECT * FROM news WHERE academy_id = ? ORDER BY created_at DESC ';

  db.query(query, [academyId], (err, results) => {
      if (err) {
          console.error('Error fetching news:', err);
          res.status(500).send('Database error' );
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'No news found' });
      }else {
          res.json(results);
        }
  });
});
//-----------------------------------------------
// Route: Publish news (Insert into MySQL)
app.post('/api/publishNews',verifyToken, upload.single('image'), (req, res) => {
  const { academy_id, title } = req.body;
  const image = req.file ? `${req.file.filename}` : null;

  if (!academy_id || !title) {
      return res.status(400).json({ error: 'academy_id and title are required' });
  }

  const query = 'INSERT INTO news (academy_id, title, image) VALUES (?, ?, ?)';
  db.query(query, [academy_id, title, image], (err, result) => {
      if (err) {
          console.error('Error inserting news:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'News published successfully', newsId: result.insertId });
  });
});
//----------------------------------------------
// Endpoint to view all academies id
app.get('/api/academies',verifyToken, (req, res) => {
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
app.delete('/api/delete-academy/academies/:id',verifyToken, (req, res) => {
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
app.get('/api/academies/:id',verifyToken, (req, res) => {
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
// app.put('/api/update-academy/academies/:id',verifyToken, upload.single('images'), (req, res) => {
//   const images = req.file ? req.file.filename : null;

//   const { id } = req.params;
//   const {
//     name,
//     address,
//     owner_name,
//     phone_num,
//     email,
//     website,
//     logo,
//     youtube,
//     instagram,
//     facebook,
//     latitude,
//     longitude,
//   } = req.body;

//   const query = `UPDATE academy SET name = ?, address = ?, owner_name = ?, phone_num = ?, email = ?, website = ?, images = ?, logo = ?, youtube = ?, instagram = ?, facebook = ?,latitude = ? , longitude = ? WHERE id = ?`;

//   db.query(query, [name, address, owner_name, phone_num, email, website, images, logo, youtube, instagram, facebook, latitude, longitude, id], (err, result) => {
//     if (err) {
//       console.error('Error updating academy:', err);
//       return res.status(500).json({ message: 'Failed to update academy' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Academy ID not found' });
//     }

//     res.json({ message: 'Academy updated successfully', success: true });
//   });
// });
app.put('/api/update-academy/academies/:id',verifyToken,
  upload.fields([
    { name: 'images', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]),
  (req, res) => {
    const { id } = req.params;
    const {
      name, address,owner_name, phone_num, email, website, youtube, instagram, facebook, latitude, longitude,
      images, // current image value (if no new file is uploaded)
      logo      // current logo value (if no new file is uploaded)
    } = req.body;

    const latVal = (!latitude || latitude === 'null') ? null : latitude;
    const longVal = (!longitude || longitude === 'null') ? null : longitude;
    // Determine new file names; if a file isn't provided, use the existing value
    const newImage =
      req.files && req.files.images && req.files.images[0]
        ? req.files.images[0].filename
        : images;
    const newLogo =
      req.files && req.files.logo && req.files.logo[0]
        ? req.files.logo[0].filename
        : logo;

    const query = `UPDATE academy SET name = ?, address = ?, owner_name = ?, phone_num = ?, email = ?, website = ?, images = ?, logo = ?, youtube = ?, instagram = ?, facebook = ?, latitude = ?, longitude = ? WHERE id = ?`;

    db.query(
      query,
      [ name, address, owner_name, phone_num, email, website, newImage, newLogo, youtube, instagram, facebook, latVal, longVal, id
      ],
      (err, result) => {
        if (err) {
          console.error('Error updating academy:', err);
          return res.status(500).json({ message: 'Failed to update academy' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Academy ID not found' });
        }

        res.json({ message: 'Academy updated successfully', success: true });
      }
    );
  }
);
//----------------------------------------------------------------------
// Fetch all sports equipment
app.get("/api/sports-equipment", verifyToken, (req, res) => {
  db.query("SELECT * FROM sports_equipment", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new sports equipment
app.post("/api/add/sports-equipment",verifyToken, (req, res) => {
  const { name, category } = req.body;
  db.query("INSERT INTO sports_equipment (name, category) VALUES (?, ?)", [name, category], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Equipment added!", id: result.insertId });
  });
});
//-----
app.put("/api/sports-equipment/:id", verifyToken,(req, res) => {
  const { name, category } = req.body;
  db.query(
    "UPDATE sports_equipment SET name = ?, category = ? WHERE id = ?",
    [name, category, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Equipment updated!" });
    }
  );
});

// Delete equipment
app.delete("/api/sports-equipment/:id",verifyToken, (req, res) => {
  db.query("DELETE FROM sports_equipment WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Equipment deleted!" });
  });
});
//--------------------------------------------------
// coach edit area / backend
// edit coach 
//fetch coach data here for inputs
app.get('/api/coach/:academyId/:coachId',verifyToken, (req, res) => {
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
app.put('/api/editCoach/:academyId/:coachId',verifyToken, (req, res) => {
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
        console.error('Error updating employee:', err);
        return res.status(500).json({ message: 'Failed to update employee.' });
      }

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'employee updated successfully!' });
      } else {
        res.status(404).json({ message: 'employee not found.' });
      }
    }
  );
});

//--------------------------------------------------------------------------

//------------------------------------------------------------------------
//add new coach 
app.get("/api/getUniqueCoachId",verifyToken, (req, res) => {
  db.query("SELECT MAX(id) AS maxId FROM employee", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching employee ID." });
    }
    // Extract the numeric part of the ID
    // const maxId = results[0].maxId ? parseInt(results[0].maxId.replace("emp", "")) : 0;
        // Handle NULL case
        const maxIdStr = results[0].maxId || "emp000"; // Default if table is empty
        const maxId = parseInt(maxIdStr.replace("emp", ""), 10) || 0;

    // Increment the numeric part and format it with leading zeros
    const newIdNumber = maxId + 1;
    const newCoachId = `emp${String(newIdNumber).padStart(3, "0")}`;

    res.status(200).json({ id: newCoachId });
  });
});
// Add coach API
// Create a route to add a coach
app.post("/api/addCoach/:academyId", verifyToken, multer().single('resume'), (req, res) => {
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
      console.error("Error fetching max employee ID:", err);
      return res.status(500).json({ message: "Failed to generate employee ID." });
    }

    // const maxId = results[0].maxId ? parseInt(results[0].maxId.replace("emp", "")) : 0;
    const maxIdStr = results[0].maxId || "emp000"; // Handle NULL case
    const maxId = parseInt(maxIdStr.replace("emp", ""), 10) || 0;
    const newCoachId = `emp${String(maxId + 1).padStart(3, "0")}`; // Generate new ID with padding

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
app.get('/api/getCoach/:academyId/:coachId',verifyToken, (req, res) => {
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
app.delete('/api/deleteCoach/:academyId/:coachId',verifyToken, (req, res) => {
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
app.get('/api/courses/:academyId/:courseId',verifyToken, (req, res) => {
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
app.put('/api/editCourse/:academyId/:courseId',verifyToken, (req, res) => {
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
app.post('/api/addCourse/:academyId',verifyToken, (req, res) => {
  const academyId = req.params.academyId;
  const { course_name, timing, fee , half_yearly , yearly } = req.body;  // Extract data from the request body

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
    const insertQuery = 'INSERT INTO courses (academy_id, course_id, course_name, timing, fee, half_yearly , yearly) VALUES (? , ?, ?, ?, ?, ?, ?)';

    db.query(insertQuery, [academyId, newCourseId, course_name, timing, fee, half_yearly , yearly], (err, result) => {
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
app.get('/api/getCourseTimings',verifyToken, async (req, res) => {
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
app.delete('/api/deleteCourse/:academyId/:courseId',verifyToken, (req, res) => {
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
app.get("/api/getDistinctBatches/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;
  db.query(
    "SELECT DISTINCT timing FROM courses WHERE academy_id = ?",
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
app.get("/api/getUniquePlayerId",verifyToken, (req, res) => {
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
app.post("/api/addPlayer/:academyId",verifyToken, upload.single("profile_pic"), (req, res) => {
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
    f_ph_num,
    m_ph_num,
    batch,
    user_id,
    fee_type,
    fee
  } = req.body;

  const academyId = req.params.academyId;
  const profilePicPath = req.file ? `${req.file.filename}` : null;
  // req.file ? req.file.path : null; 

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
  father_name, mother_name, phone_number, f_ph_num, m_ph_num, batch, profile_pic, user_id, fee_type, fee) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)

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
        f_ph_num || null, // f_ph_num
        m_ph_num || null, // m_ph_num
        batch || null, // batch
        profilePicPath || null, // profile_pic
        user_id || null,
        fee_type || null,
        fee || null,
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
app.use('/uploads',verifyToken, express.static('uploads'));

//---------------------------------------------------------
//delete player from id 
// fetch player details from id 

app.get("/api/getPlayerDetails/:playerId",verifyToken, (req, res) => {
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
app.delete("/api/deletePlayer/:playerId",verifyToken, (req, res) => {
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
app.get("/api/getPlayerDetails/:academyId/:playerId", verifyToken,(req, res) => {
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
// app.put("/api/editPlayer/:academyId/:playerId",upload.single('profile_pic'), (req, res) => {
//   const { academyId, playerId } = req.params;
//   const playerData = req.body;
//   const profilePicPath = req.file ? `${req.file.filename}` : null;
//   const query =
//     "UPDATE player SET name = ?, dob = ?, gender = ?, school_name = ?, sports_expertise = ?, address = ?, previous_academy = ?, father_name = ?, mother_name = ?, phone_number = ?, batch = ?, profile_pic = ? WHERE academy_id = ? AND id = ?";

//   db.query(
//     query,
//     [
//       playerData.name,
//       playerData.dob,
//       playerData.gender,
//       playerData.school_name,
//       playerData.sports_expertise,
//       playerData.address,
//       playerData.previous_academy,
//       playerData.father_name,
//       playerData.mother_name,
//       playerData.phone_number,
//       playerData.batch,
//       playerData.profile_pic,
//       academyId,
//       playerId,
//     ],
//     (err, results) => {
//       if (err) {
//         console.error("Error updating player details:", err);
//         return res.status(500).json({ message: "Failed to update player details." });
//       }
//       if (results.affectedRows > 0) {
//         res.status(200).json({ message: "Player details updated successfully." });
//       } else {
//         res.status(404).json({ message: "Player not found." });
//       }
//     }
//   );
// });
app.put("/api/editPlayer/:academyId/:playerId",verifyToken, upload.single("profile_pic"), (req, res) => {
  const { academyId, playerId } = req.params;
  const playerData = req.body;
  const profilePicPath = req.file ? req.file.filename : null;

  const query = `
    UPDATE player 
    SET name = ?, dob = ?, gender = ?, school_name = ?, sports_expertise = ?, 
        address = ?, previous_academy = ?, father_name = ?, mother_name = ?, 
        phone_number = ?,f_ph_num = ? , m_ph_num = ? ,  batch = ?, profile_pic = COALESCE(?, profile_pic) 
    WHERE academy_id = ? AND id = ?
  `;

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
      playerData.f_ph_num ,
      playerData.m_ph_num,
      playerData.batch,
      profilePicPath, // Updates profile_pic only if a new file is uploaded, otherwise keeps existing value
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
app.post('/api/addAsset/:academyId',verifyToken, (req, res) => {
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
app.get('/api/assets/:academyId/:assetId',verifyToken, (req, res) => {
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
app.put('/api/editAsset/:academyId/:assetId',verifyToken, (req, res) => {
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
app.delete('/api/deleteAsset/:academyId/:assetId',verifyToken, (req, res) => {
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
app.get("/api/totalPlayers",verifyToken, (req, res) => {
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
// Get total player count
app.get("/api/totalPlayers/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = "SELECT COUNT(id) AS total FROM player WHERE academy_id = ?";

  db.query(query,[academyId], (err, results) => {
    if (err) {
      console.error("Error fetching total player count:", err);
      return res.status(500).json({ message: "Error fetching total player count." });
    }
    res.status(200).json({ total: results[0].total });
  });
});
//-------------------------------------------------
// Get revenue from academy
app.get("/api/revenue/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = "SELECT SUM(paid_amount) AS YTD_Revenue FROM playerfinancial WHERE YEAR(created_at) = YEAR(CURDATE()) AND academy_id = ?";

  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching revenue:", err);
      return res.status(500).json({ message: "Error fetching revenue." });
    }
    
    res.status(200).json({ YTD_Revenue: results[0]?.YTD_Revenue || 0 });  // Fixed key name
  });
});
//----------------------------------------------------
//fetch by age under 10 , 12, 14, 16 players 
app.get("/api/player-count/:academyId", (req, res) => {
  const {academyId} = req.params;
  const query = `
    SELECT 
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, DOB, CURDATE()) < 10 THEN 1 ELSE 0 END) AS Under_10,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, DOB, CURDATE()) BETWEEN 10 AND 11 THEN 1 ELSE 0 END) AS Under_12,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, DOB, CURDATE()) BETWEEN 12 AND 13 THEN 1 ELSE 0 END) AS Under_14,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, DOB, CURDATE()) BETWEEN 14 AND 15 THEN 1 ELSE 0 END) AS Under_16,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, DOB, CURDATE()) > 16 THEN 1 ELSE 0 END) AS Above_16
    FROM player WHERE academy_id= ?`;

  db.query(query,[academyId], (err, results) => {
    if (err) {
      console.error("Error fetching player counts:", err);
      return res.status(500).json({ message: "Error fetching player counts." });
    }

    res.status(200).json(results[0]); // Return the player counts
  });
});
//----------------------------
// fetch coach count for academy dashboard

app.get("/api/coach-count/:academyId",verifyToken, (req, res) => {
  const {academyId} = req.params;
  const query = `
    SELECT count(id) AS totalCoach FROM employee WHERE academy_id= ?`;

  db.query(query,[academyId], (err, results) => {
    if (err) {
      console.error("Error fetching coach counts:", err);
      return res.status(500).json({ message: "Error fetching coach counts." });
    }

    res.status(200).json(results[0]); // Return the player counts
  });
});
//------------------------------------
// fetch courses count for academy dashboard

app.get("/api/total-courses/:academyId",verifyToken, (req, res) => {
  const {academyId} = req.params;
  const query = `
    SELECT count(course_id) AS countTotalCourses FROM courses WHERE academy_id= ?`;

  db.query(query,[academyId], (err, results) => {
    if (err) {
      console.error("Error fetching courses counts:", err);
      return res.status(500).json({ message: "Error fetching courses counts." });
    }

    res.status(200).json(results[0]); // Return the player counts
  });
});
//---------------------------------------------
//fetch outstanding fee
app.get("/api/outstanding-fee/:academyId/:id",verifyToken, (req, res) => {
  const {academyId ,id} = req.params;
  const query = `
    SELECT SUM(total_fee) AS playerOutstandingFee FROM playerfinancial WHERE academy_id= ? AND player_id = ?`;

  db.query(query,[academyId ,id], (err, results) => {
    if (err) {
      console.error("Error fetching outstanding fee:", err);
      return res.status(500).json({ message: "Error fetching outstanding fee." });
    }

    res.status(200).json(results[0]); // Return the player counts
  });
});
//------------------------------------------
// player active or deactive toogle button
app.post("/updatePlayerStatus",verifyToken, async (req, res) => {
  const { playerId, status } = req.body;

  try {
    db.query("UPDATE player SET status = ? WHERE id = ?", [status, playerId]);
    res.status(200).json({ message: "Player status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
//-------------------------------------------
app.post("/updateCoachStatus",verifyToken, async (req, res) => {
  const { coachId, status } = req.body;

  try {
    db.query("UPDATE employee SET status = ? WHERE id = ?", [status, coachId]);
    res.status(200).json({ message: "Coach status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
//-------------------------------------
// add player cricket record 
app.post('/api/cricket-data/:academyId/:id/:name',verifyToken, (req, res) => {
  const { academyId, id, name } = req.params;
  const { matches_played, runs, wickets } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Player ID is required' });
  }

  // First, check if the player ID exists
  const checkSql = 'SELECT * FROM cricket_data WHERE player_id = ? AND academy_id = ?';
  db.query(checkSql, [id, academyId], (err, results) => {
    if (err) {
      console.error('Error checking player:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      // Player exists, run UPDATE query
      const updateSql = `
        UPDATE cricket_data 
        SET name = ?, matches_played = ?, runs = ?, wickets = ? 
        WHERE player_id = ? AND academy_id = ?
      `;
      const updateValues = [name, matches_played, runs, wickets, id, academyId];

      db.query(updateSql, updateValues, (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Error updating data:', updateErr);
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Data updated successfully' });
      });
    } else {
      // Player does not exist, run INSERT query
      const insertSql = `
        INSERT INTO cricket_data (player_id, name, matches_played, runs, wickets, academy_id) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const insertValues = [id, name, matches_played, runs, wickets, academyId];

      db.query(insertSql, insertValues, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error inserting data:', insertErr);
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'Data added successfully', id: insertResult.insertId });
      });
    }
  });
});

//------------------------------------------------

//display player cricket score
app.get("/api/cricket-data/player/:academyId/:id",verifyToken, (req, res) => {

  const {academyId,id} = req.params;
  const sql = "SELECT * FROM cricket_data WHERE academy_id = ? AND player_id = ?";
  db.query(sql,[academyId,id], (err, result) => {
      if (err) {
          console.error("Error fetching data:", err);
          return res.status(500).json({ message: "Database error" });
      }
      res.json(result);
  });
});

//--------------------------------------------
// fetch cricket score data 
app.get("/api/cricket-data/graph/:academyId",verifyToken, (req, res) => {
  const {academyId} = req.params;
  const sql = "SELECT * FROM cricket_data WHERE academy_id = ?";
  db.query(sql,[academyId], (err, result) => {
      if (err) {
          console.error("Error fetching data:", err);
          return res.status(500).json({ message: "Database error" });
      }
      res.json(result);
  });
});
//-----------------------------------------
  //fetch player total count 
  app.get("/api/count-total-player/:academyId",verifyToken, (req, res) => {
    const {academyId} = req.params;
    const query = `
      SELECT count(id) AS countTotalPlayer FROM player WHERE academy_id= ?`;
  
    db.query(query,[academyId], (err, results) => {
      if (err) {
        console.error("Error fetching player counts:", err);
        return res.status(500).json({ message: "Error fetching player counts." });
      }
      res.status(200).json(results[0]); // Return the player counts
    });
  });

//-------------------------------------------------
//fetch particular player info by academy id AND id
app.get("/api/allPlayers/:academyId/:id",verifyToken, (req, res) => {
  const { academyId, id } = req.params;

  const query = `SELECT * FROM player WHERE academy_id = ? AND id = ? `;
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
app.get("/api/playerDetailsById/:id",verifyToken, (req, res) => {
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
app.get("/api/playerDetailsByName/:name",verifyToken, (req, res) => {
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
app.get("/api/financial-records/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = ` SELECT * FROM playerfinancial WHERE academy_id = ?`;

  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

//-----------------------------------------------
// fetch player payment info by id 
app.get("/api/edit-financial-records/:id",verifyToken, (req, res) => {
  const { id } = req.params;  // id is fetched from the URL parameter
  const query = `SELECT * FROM playerfinancial WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    // If no results found
    if (results.length === 0) {
      return res.status(404).json({ error: "No record found for the given ID." });
    }

    res.json(results); // Return the results
  });
});
//---------------------------------------------------------------
// edit player payment record from id 
// Route to update the player payment record
app.put('/api/edit-player-payment-record/:id',verifyToken, (req, res) => {
  const { id } = req.params;  // The ID of the payment record to update
  const { player_name, total_fee, paid_amount, due_amount, due_date, status, remarks } = req.body;

  // Convert the due_date to local date format 'YYYY-MM-DD HH:MM:SS'
  const localDueDate = new Date(due_date);

  // Adjust to local timezone by extracting the date part and formatting
  const formattedDueDate = localDueDate
    .toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }) // Use appropriate timezone
    .slice(0, 19)
    .replace('T', ' ');
    
  // Update the payment record in the database
  const updateQuery = `
      UPDATE playerfinancial
      SET 
          player_name = ?, 
          total_fee = ?, 
          paid_amount = ?, 
          due_amount = ?,
          due_date = ? , 
          status = ?, 
          remarks = ?
      WHERE id = ?
  `;
  const values = [player_name, total_fee, paid_amount, due_amount, formattedDueDate, status, remarks, id];

  db.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error('Error updating player payment record:', err);
      return res.status(500).json({ message: 'Failed to update record' });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({ message: 'Player payment record updated successfully!' });
    } else {
      return res.status(404).json({ message: 'Player payment record not found.' });
    }
  });
});
//------------------------------------------------------
// Fetch records by date range
app.get("/api/financial-records", verifyToken,(req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "From and To dates are required." });
  }

  const query = `
    SELECT * FROM playerfinancial 
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
app.get("/api/financial-records/week/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;

  const query = `
    SELECT * FROM playerfinancial 
    WHERE academy_id = ? AND WEEK(due_date, 1) = WEEK(CURDATE(), 1) 
    AND YEAR(due_date) = YEAR(CURDATE())
    ORDER BY due_date ASC
  `;
  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching weekly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// 3. Fetch records for this month
app.get("/api/financial-records/month/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;

  const query = `
    SELECT * FROM playerfinancial 
    WHERE academy_id = ? AND MONTH(due_date) = MONTH(CURDATE()) 
    AND YEAR(due_date) = YEAR(CURDATE())
    ORDER BY due_date ASC
  `;
  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching monthly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// 4. Fetch records for this year
app.get("/api/financial-records/year/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = `
    SELECT * FROM playerfinancial 
    WHERE academyId = ? AND YEAR(due_date) = YEAR(CURDATE())
    ORDER BY due_date ASC
  `;
  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching yearly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});

// 5. Search by player ID or name
app.get("/api/financial-records/player/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;
  const { playerId, playerName } = req.query;

  let query = "SELECT * FROM playerfinancial WHERE 1=1";
  const params = [];

  if (playerId) {
    query += " AND academy_id = ? AND player_id = ?";
    params.push(academyId, playerId);
  }
  if (playerName) {
    query += " AND academy_id = ? AND player_name LIKE ?";
    params.push(academyId, `%${playerName}%`);
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
app.get("/api/financial-records/pending/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = `
    SELECT * FROM playerfinancial 
    WHERE status = 'pending' AND academy_id=?;
  `;
  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error("Error fetching monthly data:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.json(results);
  });
});



// delete player payment record 
// Delete a player payment record
app.delete('/api/delete-player-payment-info/:id',verifyToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM playerfinancial WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting player payment record:', err);
      res.status(500).send('Error deleting player payment record');
    } else {
      res.send('Player payment record deleted successfully');
    }
  });
});
//---------------------------------------------------
// Edit player financial record with id
// Update a financial record
app.put('/playerfinancial/:id',verifyToken, (req, res) => {
  const { id } = req.params;
  const {
    player_id,
    player_name,
    total_fee,
    paid_amount,
    due_amount,
    due_date,
    status,
    remarks,
    academy_id,
  } = req.body;

  const query = `UPDATE playerfinancial 
        SET player_id = ?, player_name = ?, total_fee = ?, paid_amount = ?, due_amount = ?, due_date = ?, status = ?, remarks = ?, academy_id = ?
        WHERE id = ?`;

  const values = [player_id, player_name, total_fee, paid_amount, due_amount, due_date, status, remarks, academy_id, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating record' });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});
//-----------------------------------------------------------
// Form submission for player payments
app.post('/api/playerfinancial',verifyToken, (req, res) => {
  const {
    player_id,
    player_name,
    total_fee,
    paid_amount,
    due_amount,
    due_date,
    status,
    remarks,
    academy_id
  } = req.body;

  const query = `
      INSERT INTO playerfinancial (
          player_id, 
          player_name, 
          total_fee, 
          paid_amount, 
          due_amount, 
          due_date, 
          status, 
          remarks, 
          academy_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [player_id, player_name, total_fee, paid_amount, due_amount, due_date, status, remarks, academy_id],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err.message);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.status(200).json({ message: 'Data inserted successfully', id: result.insertId });
    }
  );
});



//-------------------------------------------------------
// booking role here 
// display all assets for booking 
app.get('/assets-bookings/:academyId',verifyToken, (req, res) => {
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
//------------------
// Get all groundss 
app.get('/all-grounds/:academyId', verifyToken,(req, res) => {
  const { academyId } = req.params;
  const query = 'SELECT * FROM grounds where academy_id != ?';
  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error('Error fetching ground:', err);
      res.status(500).send('Error fetching ground');
    } else {
      res.json(results);
    }
  });
});

//-------------------------
// Get grounds based on ground id
app.get('/all-bookable-grounds/:academyId/:id', verifyToken,(req, res) => {
  const { academyId, id } = req.params;
  const query = 'SELECT * FROM grounds where academy_id != ? AND id=?';
  db.query(query, [academyId, id], (err, results) => {
    if (err) {
      console.error('Error fetching ground:', err);
      res.status(500).send('Error fetching ground');
    } else {
      res.json(results);
    }
  });
});
//-------------------------------
//// booking role here 
// Get all bookings
app.get('/bookings/:academyId',verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = 'SELECT * FROM grounds where academy_id = ?';
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
// Update booking route to handle file upload
// app.post('/bookings/:role/:academyId', upload.single('image'), (req, res) => {
//   const { academyId } = req.params;
//   const { name, date_of_booking, time, amount, customer_name, contact, status, remarks, location } = req.body;
//   const image_url = req.file ? req.file.filename : null;

//   if (!name || !date_of_booking || !time || !amount || !customer_name || !contact || !status || !remarks || !location || !image_url) {
//       return res.status(400).send('All fields are required');
//   }

//   const query = 'INSERT INTO grounds (name, date_of_booking, time, amount, customer_name, contact, status, remarks, academy_id, location, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   db.query(query, [name, date_of_booking, time, amount, customer_name, contact, status, remarks, academyId, location, image_url], (err, result) => {
//       if (err) {
//           console.error('Error adding grounds:', err);
//           return res.status(500).send(`Error adding grounds: ${err.message}`);
//       } else {
//           res.status(201).send('Grounds added successfully');
//       }
//   });
// });
app.post('/bookings/:role/:academyId',verifyToken, upload.single('image'), (req, res) => {
  const { academyId } = req.params;
  const { name, date_of_booking, time, amount, customer_name, contact, status, remarks, location, about } = req.body;
  const image_url = req.file ? req.file.filename : null;

  const query = `
      INSERT INTO grounds (name, date_of_booking, time, amount, customer_name, contact, status, remarks, academy_id, location, image_url,about)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  db.query(query, [name, date_of_booking, time, amount, customer_name, contact, status, remarks, academyId, location, image_url, about], (err, result) => {
    if (err) {
      console.error('Error adding booking:', err);
      res.status(500).send('Error adding ground.');
    } else {
      res.status(201).send('Ground added successfully.');
    }
  });
});



// Get a single grounds by ID
app.get('/bookings/:id',verifyToken, (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM grounds WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching grounds:', err);
      res.status(500).send('Error fetching grounds');
    } else {
      res.json(results[0]);
    }
  });
});
// Update a grounds
app.put('/bookings/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { name, date_of_booking, time, amount, customer_name, contact, status, remarks, location, image_url } = req.body;
  const query = 'UPDATE grounds SET name = ?, date_of_booking = ?, time = ?, amount = ?, customer_name = ?, contact = ?, status = ?, remarks = ? , ,location = ? ,image_url = ? WHERE id = ?';
  db.query(query, [name, date_of_booking, time, amount, customer_name, contact, status, remarks, location, image_url, id], (err) => {
    if (err) {
      console.error('Error updating grounds:', err);
      res.status(500).send('Error updating grounds');
    } else {
      res.send('grounds updated successfully');
    }
  });
});

// Delete a grounds
app.delete('/bookings/:id',verifyToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM grounds WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting grounds:', err);
      res.status(500).send('Error deleting grounds');
    } else {
      res.send('grounds deleted successfully');
    }
  });
});

//------------------------------
// -------------------
app.post('/api/bookings-book-now',verifyToken, (req, res) => {
  const { academy_id, item_type, item_id, booking_date, start_time, end_time, booked_by, contact_number, status } = req.body;

  const bookingDate = new Date(booking_date);
  const year = bookingDate.getFullYear();
  const month = String(bookingDate.getMonth() + 1).padStart(2, '0');
  const day = String(bookingDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const query = `
    INSERT INTO bookings (academy_id, item_type, item_id, booking_date, start_time, end_time, booked_by, contact_number, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [academy_id, item_type, item_id, formattedDate, start_time, end_time, booked_by, contact_number, status], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err.message);
      return res.status(500).json({ message: 'Booking failed', error: err.message });
    }
    return res.status(200).json({ message: 'Booking successful' });
  });
});

//---------------------------------------------------
//display all bookings of academy id 
// API to fetch booked data
app.get('/api/booked/:academy_id',verifyToken, (req, res) => {
  const { academy_id } = req.params;
  console.log('Received request for academy_id:', academy_id);

  const query = `
      SELECT booking_id, item_type, item_id, booking_date, start_time, end_time, booked_by, contact_number, status 
      FROM bookings 
      WHERE academy_id = ? AND status = 'Confirmed';
  `;

  db.query(query, [academy_id], (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log detailed error
      return res.status(500).json({ message: 'Error fetching bookings', error: err });
    }

    console.log('Query executed successfully:', results);
    res.status(200).json(results);
  });
});

//--------------------------------------------------
//booked date fetch academyid 

app.get('/api/bookings/dates/:id',verifyToken, (req, res) => {
  const { id } = req.params;
  const query = 'SELECT DATE(booking_date) AS booking_date FROM bookings WHERE item_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error fetching booked dates:', err);
      return res.status(500).json({ message: 'Failed to fetch booked dates' });
    }
    const bookedDates = result.map(row => {
      const date = new Date(row.booking_date); // Convert to Date object
      return date.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
    });

    return res.status(200).json(bookedDates); // Return an array of formatted dates

  });
});
//------------------------------
// public grounds home grounds 
app.get('/public-bookings',verifyToken, (req, res) => {

  const query = 'SELECT * FROM grounds';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching grounds:', err);
      res.status(500).send('Error fetching grounds');
    } else {
      res.json(results);
    }
  });
});
//-------------------------------------------------------------
// bookable dashboard for booking 

//---------------------------------------------------
//all bookings 
// Get bookings for a specific academy
app.get('/all-bookings/:academyId', verifyToken, (req, res) => {
  const { academyId } = req.params;
  const query = `
      SELECT 
          booking_id, item_type, item_id, booking_date, start_time, end_time, 
          booked_by, contact_number, status 
      FROM bookings 
      WHERE academy_id = ? 
      ORDER BY booking_date DESC, start_time ASC
  `;

  db.query(query, [academyId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err.message);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
    res.status(200).json(results);
  });
});

//----------------------------------------------------
//total revenue
// Total Revenue - Summing 'amount' from the grounds and player_financial table
app.get("/api/booking/totalrevenue/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;

  // Query for total revenue from the 'grounds' table
  const bookingRevenueQuery = `
    SELECT SUM(amount) AS totalRevenue
    FROM grounds
    WHERE academy_id = ? AND status='confirmed';
  `;

  // Query for total revenue from the 'player_financial' table
  const playerRevenueQuery = `
    SELECT SUM(paid_amount) AS totalRevenue
    FROM playerfinancial
    WHERE academy_id = ?;
  `;

  // Run both queries
  db.query(bookingRevenueQuery, [academyId], (err, bookingResults) => {
    if (err) {
      console.error("Error fetching grounds revenue:", err);
      return res.status(500).json({ error: "Error fetching grounds revenue" });
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
app.get("/api/player_financial/totalexpenses/:academyId",verifyToken, (req, res) => {
  const { academyId } = req.params;

  const query = `
    SELECT SUM(amount) AS totalExpenses
    FROM grounds
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
app.get("/api/player_financial/acreceivable/:academyId",verifyToken, (req, res) => {
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
app.get('/api/coaches/:academyId/:id',verifyToken, (req, res) => {
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
app.get('/api/allplayer', verifyToken, (req, res) => {
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
