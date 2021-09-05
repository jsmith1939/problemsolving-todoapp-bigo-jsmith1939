import express from "express";
import authRouter from './auth';
import userRouter from './users';
import todoRouter from './todos';

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("api endpoint");
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/todos', todoRouter);


module.exports = router;
