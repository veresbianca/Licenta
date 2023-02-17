const db = require("../config/connection");
const {
  User,
  Post,
  Exercise,
  Meal,
  Stats,
  Profesionalist,
} = require("../models");
const userSeeds = require("./userSeeds.json");
const exerciseSeeds = require("./exerciseSeeds.json");
const mealSeeds = require("./mealSeeds.json");
const postSeeds = require("./postSeeds.json");
const nutritionistsSeeds = require("./nutritionistsSeeds.json");
const medicSeeds = require("./medicSeeds.json");
const trainnersSeeds = require("./trainnersSeeds.json");

db.once("open", async () => {
  try {
    await Post.deleteMany({});
    await User.deleteMany({});
    await Exercise.deleteMany({});
    await Meal.deleteMany({});
    await Profesionalist.deleteMany({});

    await User.create(userSeeds);
    await Profesionalist.create(nutritionistsSeeds);
    await Profesionalist.create(medicSeeds);
    await Profesionalist.create(trainnersSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postAuthor } = await Post.create(postSeeds[i]);
      await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }

    for (let i = 0; i < exerciseSeeds.length; i++) {
      await Exercise.create(exerciseSeeds[i]);
    }

    // for (let i = 0; i < mealSeeds.length; i++) {
    //   await Meal.create(mealSeeds[i]);
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
