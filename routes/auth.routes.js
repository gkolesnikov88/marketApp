const {Router} = require('express');
const router = Router();
const AdminUser = require('./../models/AdminUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

router.post(
  '/adminLogin',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        return res.status(400).json({
          errors: validationError.array(),
          message: 'Validations error on login'
        })
      }

      const {email, password} = req.body;
      const adminUser = await AdminUser.findOne({email});

      if(!adminUser) {
        return res.status(400).json({message: "User not defined"});
      }

      const isMatch = await bcrypt.compare(password, adminUser.password);
      if (!isMatch) {
        return res.status(400).json({message: "Incorrect password, try again"});
      }
      const expiresIn = '3600';
      const token = jwt.sign(
        {userId: adminUser.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({token, userId: adminUser.id, expiresIn});

    } catch (e) {
      res.status(500).json({message: "Something go wrong, try later"});
    }
  }
)

module.exports = router;
