const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Check this');
})

module.exports = router 