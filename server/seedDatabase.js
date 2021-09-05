import chalk from "chalk";
import Todo from "./models/todo";
import User from "./models/user";

import exec from "await-exec";

async function seedDatabase() {
  try {
    const users = await User.find({});
    const todos = await Todo.find({});
    if (users.length === 0 && todos.length === 0) {
      console.log(
        chalk.yellow(
          "No users or todos in the database, creating sample data..."
        )
      );

      await exec(
        "mongoimport --db todoapp --collection todos --file ./db/todos.json"
      );
      await exec(
        "mongoimport --db todoapp --collection users --file ./db/users.json"
      );

      console.log(chalk.green(`Successfully populated database!!`));
    } else {
      console.log(
        chalk.yellow("Database already initiated, skipping populating script")
      );
    }
  } catch (error) {
    console.log(chalk.red(error));
  }
}

module.exports = seedDatabase;
