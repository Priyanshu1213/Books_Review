const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password ,admin} = req.body;

   if (!/^[a-zA-Z0-9]+$/.test(name)) {
  return res.status(400).json({ message: 'Name should contain only alphanumeric  characters' });
}

else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return res.status(400).json({ message: 'Invalid email format' });
}
  
else if (password.length <6) {
      return res.status(400).json({ message: 'Password should be at least 6 characters long' });
    }

    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: admin,
        });

        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({ ...savedUser._doc, token ,message: 'User created! You are now log in.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    User login
// @route   POST /users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
        
    else if (password.length <6) {
            return res.status(400).json({ message: 'Password should be at least 6 characters long' });
          }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ ...user._doc, token ,message: 'User Login successfully',success:true});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user profile
// @route   GET /users/:id
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user profile
// @route   PUT /users/:id
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name, email, password} = req.body;

        if (!/^[a-zA-Z0-9]+$/.test(name)) {
            return res.status(400).json({ message: 'Name should contain only alphanumeric  characters' });
          }
          
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
          }

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            if (password.length <6) {
                return res.status(400).json({ message: 'Password should be at least 6 characters long' });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        await user.save();
        res.json({...user._doc,token,message: 'User Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
