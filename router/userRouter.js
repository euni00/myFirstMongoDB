// /make-user -> POST
// /delete-all -> DELETE

const router = require('express').Router();
const User = require('../models/users');

// POST
// username & password (body)
router.post('/make-user', async (req, res) => {
    const user = new User({
        // const(username, password) = req.body;
        // console.log(req.body);
        username: res.body.username,
        password: res.body.password,
    });

    /*
    await user.save((err, user) => {
        if (err) {
            res.sendStatus(500);
            res.send(err);
        } else {
            res.sendStatus(200);
        }
    });
    */
   
    user.save()
        .exec()
        .then((user) => {
        res.send(user);
        })
        .catch((err) => {
        res.sendStates(500);
    })
})

module.exports = router;