const { Router } = require("express");
const userRoute = Router();
const zod = require("zod");
const { User, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/authentication");

const validateUser = zod.object({
  username: zod.string().email(),
  firstname: zod.string().max(30),
  lastname: zod.string().max(30),
  password: zod.string().min(6),
});

userRoute.post("/signup", async (req, res) => {
  try {
    const validUser = validateUser.safeParse(req.body);
    if (!validUser.success) {
      throw new Error(validUser.error);
    } else {
      const userExsist = await User.findOne({
        username: req.body.username,
      });
      if (userExsist) {
        throw new Error("User already exists");
      }

      const user = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
      });

      // creating random balance for user cos there is no bank
      await Accounts.create({
        userId: user._id,
        balance: Math.random() * 10000,
      });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(200).json({ token: token });
    }
  } catch (error) {
    res.status(411).json(JSON.parse(error.message));
  }
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRoute.post("/signin", async (req, res) => {
  const login = signinBody.safeParse(req.body);
  try {
    if (!login.success) {
      throw new Error("Username or Password are not correct.");
    }
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(200).json({ token: token });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    // sending error
    console.log(error.message);
    res.status(411).json(error.message);
  }
});

const updatePayload = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

userRoute.put("/", authMiddleware, async (req, res) => {
  try {
    //check inputs
    const { success } = updatePayload.safeParse(req.body);

    if (!success) {
      throw new Error("information is wrong");
    }

    //update in DB
    const filter = { _id: req.userId };
    const update = { $set: req.body };
    await User.updateOne(filter, update);

    //send succesfull message
    res.status(200).json({ message: "Updated Succesfully" });
  } catch (error) {
    //send error
    console.log(error.message);
    res.status(411).json({ message: error.message });
  }
});

userRoute.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{ firstname: { $regex: filter } }, { lastname: { $regex: filter } }],
    _id: { $ne: req.userId },
  });
  res.status(200).json({
    users: users.map((user) => ({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      id: user._id,
    })),
  });
});

module.exports = userRoute;
