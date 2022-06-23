const express = require('express')
const User = require('../models/Users')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUsers = require('../middleware/fetchUser')

const JWT_SECRET = 'HelloWorld';

// Create User...., No Login Required. URL...... /api/auth/createUser
router.post('/createuser',

    body('name', 'Enter name with length of 5 minimum.').isLength({ min: 5 }),
    body('email', 'Enter valid Email.').isEmail(),
    body('password', 'Enter Password minimum length of 5').isLength({ min: 5 })

    , async (req, res) => {
        // If there are errors then return bad request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Check That user already exit with the email.
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry the user alrady exist with this emai." })
            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // .then(user => res.json(user))
            // .catch(err =>{console.log(err)
            // res.json({error: 'Please Enter a unique Email'})})
            //res.json(user)
            res.json({ authToken })
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("SInternal Server Error.")
        }
    })

// Authenticate User...., Login Required. URL...... /api/auth/login

router.post('/login',

    body('email', 'Enter valid Email.').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    async (req, res) => {
        // If there are errors then return bad request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ error: "Please try to login with correct credentials." });
            }
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                res.status(400).json({ error: "Please try to login with correct credentials." });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken })
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error.")
        }
    })


// Get User Detail...., Login Required. URL...... /api/auth/getuser
router.post('/getuser', fetchUsers, async (req, res) => {

    try {
        var userId = req.user.id;
        console.log(userId)
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error.")
    }
})

module.exports = router