const { Router } = require('express')
const auth = require("../middleware/auth");
const { getItem } = require('../actions/schemaRegistration')
const UserModel = require('../models/User')
const mobile = require('is-mobile')
const router = Router()


router.get("/user/:id", auth, async (req, res) => {
  try {
    console.log('req.params.id', req.params.id)
    const currentUser = await UserModel.findById(req.params.id);
    const item = await getItem('User', currentUser)
    const isMobile = mobile({ ua: req })
    res.status(200).json({ ...item, isMobile });
  } catch (e) {
    res.status(500).json({ message: "Something wend wrong!" });
  }
});

module.exports = router
