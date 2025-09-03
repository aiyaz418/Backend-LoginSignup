const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

const users = [];


app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }
  
 
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'User already exists' 
    });
  }
  
 
  const newUser = { 
    id: users.length + 1, 
    username, 
    password 
  };
  users.push(newUser);
  
  res.status(201).json({ 
    success: true, 
    message: 'User created successfully',
    user: { id: newUser.id, username: newUser.username }
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
 
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }
  
 
  const user = users.find(user => user.username === username && user.password === password);
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid username or password' 
    });
  }
  
  res.json({ 
    success: true, 
    message: 'Login successful',
    user: { id: user.id, username: user.username }
  });
});


app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});


app.get('/users', (req, res) => {
  res.json({ 
    success: true, 
    users: users.map(user => ({ id: user.id, username: user.username }))
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
