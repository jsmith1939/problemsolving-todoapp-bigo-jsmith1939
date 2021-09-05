import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models";

const router = express.Router();

router
  .route("/:id")
  .get(async (request, response) => {
    const user = await User.findOne({ username: request.params.id });
    if (user) {
      response.json(user.toJSON());
    } else {
      response.status(404).end();
    }
  })
  .put(async (request, response) => {
    const { password } = request.body;
    const { username } = request.params;

    const hashedpassword = await bcrypt.hash(password, 12);

    try {
      const userUpdate = await User.findByIdAndUpdate(
        {
          username: username,
        },
        {
          passwordHash: hashedpassword,
        },
        {
          new: true,
        }
      );

      response.json(userUpdate.toJSON());
    } catch (error) {
      response.status(404);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const deleteUser = await User.deleteOne({ username: id });
      if (deleteUser) {
        res.send(`You have deleted ${id}'s profile`);
      }
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  });

module.exports = router;
