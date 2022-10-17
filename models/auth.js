const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.post(
  "/register-user",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длинна пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          info: errors.array(),
          message: "Некоректные данные авторизации",
          code: 10001,
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({
          info: [
            {
              msg: "Пользователь уже существует",
              param: "phone",
            },
          ],
          message: "Такой пользователь уже существует",
          code: 10001,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ phone, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res.status(500).json({ message: "Something wend wrong!" });
    }
  }
);

router.post(
  "/login-user",
  [
    check("email", "Некорректный телефон").isLength({ min: 12 }),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: {
            error: errors.array(),
            message: "Некоректные данные при входе",
            code: 10001,
          }
        });
      }

      const { phone, password, remember } = req.body;

      const user = await User.findOne({ phone });

      if (!user) {
        return res.status(400).json({
          data: {
            error: 'Пользователя не существует'
          }
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          data: {
            error: 'Не верный пароль'
          }
        });
      }

      // ToDo вынести токен в конфиг
      const token = jwt.sign({ userId: user._id }, 'horbachUi', {
        expiresIn: remember ? '120h' : '8h',
      });

      res.status(200).json({ data: { token, userId: user._id, isGuest: false, } });
    } catch (e) {
      res.status(500).json({ message: 'Something wend wrong!' });
    }
  }
);

module.exports = router;
