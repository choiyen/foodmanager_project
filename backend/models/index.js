const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")["development"];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// User
const User = require("./User")(sequelize, Sequelize.DataTypes);

// 음식 기록
const FoodLog = require("./FoodLog/FoodLog")(sequelize, Sequelize.DataTypes);

// 냉장고
const Grocery = require("./Grocery/Grocery")(sequelize, Sequelize.DataTypes);

// 레시피
const Recipe = require("./Recipe/Recipe")(sequelize, Sequelize.DataTypes);
const Step = require("./Recipe/Step")(sequelize, Sequelize.DataTypes);
const Ingredient = require("./Recipe/Ingredient")(
  sequelize,
  Sequelize.DataTypes
);
const RecipeReview = require("./Recipe/RecipeReview")(
  sequelize,
  Sequelize.DataTypes
);
const RecipeLike = require("./Recipe/RecipeLike")(
  sequelize,
  Sequelize.DataTypes
);

const DefaultRecipe = require("./Recipe/DefaultRecipe")(sequelize, Sequelize.DataTypes);

// 게시물
const Posting = require("./Posting/Posting")(sequelize, Sequelize.DataTypes);
const PostComment = require("./Posting/PostComment")(
  sequelize,
  Sequelize.DataTypes
);
const PostLike = require("./Posting/PostLike")(sequelize, Sequelize.DataTypes);

// 관계 설정

// A user can have many food logs, groceries, recipes, posts, and post comments
User.hasMany(FoodLog, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Grocery, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Recipe, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Posting, { 
  foreignKey: "userID", 
  onDelete: "CASCADE", 
  onUpdate: "CASCADE" 
});
User.hasMany(PostComment, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A user can give many recipe reviews and likes
User.hasMany(RecipeReview, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(RecipeLike, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(PostLike, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A food log belongs to a user
FoodLog.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A grocery belongs to a user
Grocery.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A recipe belongs to a user
Recipe.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A post belongs to a user
Posting.belongsTo(User, { 
  foreignKey: "userID", 
  onDelete: "CASCADE", 
  onUpdate: "CASCADE" 
});

// A post comment belongs to a user and a post
PostComment.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

PostComment.belongsTo(Posting, { 
  foreignKey: "postingID", 
  onDelete: "CASCADE", 
  onUpdate: "CASCADE" 
});

// A recipe review belongs to a user and a recipe
RecipeReview.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
RecipeReview.belongsTo(Recipe, {
  foreignKey: "recipeID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A recipe like belongs to a user and a recipe
RecipeLike.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
RecipeLike.belongsTo(Recipe, {
  foreignKey: "recipeID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A post like belongs to a user and a post
PostLike.belongsTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

PostLike.belongsTo(Posting, { 
  foreignKey: "postingID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A recipe has many ingredients
Recipe.hasMany(Ingredient, {
  foreignKey: "recipeID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A step belongs to a recipe
Step.belongsTo(Recipe, {
  foreignKey: "recipeID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.User = User;

db.FoodLog = FoodLog;
// db.UserLog = UserLog;

db.Recipe = Recipe;
db.Step = Step;
db.Ingredient = Ingredient;
db.RecipeReview = RecipeReview;
db.RecipeLike = RecipeLike;
db.DefaultRecipe = DefaultRecipe;
// db.UserRecipe = UserRecipe;

db.Posting = Posting;
db.PostComment = PostComment;
db.PostLike = PostLike;
// db.UserPosting = UserPosting;

db.Grocery = Grocery;
// db.UserGrocery = UserGrocery;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
