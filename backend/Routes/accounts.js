const { Router } = require("express");
const { authMiddleware } = require("../middleware/authentication");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");
const accountRoute = Router();

accountRoute.get("/balance", authMiddleware, async (req, res) => {
  const account = await Accounts.findOne({ userId: req.userId });
  res.status(200).json({ balance: account.balance.toFixed(2) });
});

accountRoute.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  //Start transaction
  session.startTransaction();
  const { to, ammount } = req.body;
  const account = await Accounts.findOne({ userId: req.userId }).session(session);

  // balance is less or something break
  if (!account || account.balance < ammount) {
    await session.abortTransaction(); // roll back transaction
    res.status(400).json({
      message: "Insufficient balance",
    });
  }

  //find user to send money
  const toAccount = await Accounts.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction(); // roll back transaction
    res.status(400).json({
      message: "Invalid account",
    });
  }

  //perform transaction
  await Accounts.updateOne(
    { userId: req.userId },
    {
      $inc: { balance: -ammount },
    }
  ).session(session);

  await Accounts.updateOne(
    { userId: to },
    {
      $inc: { balance: ammount },
    }
  ).session(session);

  // commit transaction
  await session.commitTransaction();
  res.json({ message: "Transfer successful" });
});

module.exports = accountRoute;
