npm init -y
npm install mongoose


// team.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/sports_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Player schema
const playerSchema = new mongoose.Schema({
  name: String,
  position: String,
  rushingYards: Number,
  touchdownsThrown: Number,
  sacks: Number,
  fieldGoalsMade: Number,
  fieldGoalsMissed: Number,
  catchesMade: Number,
});

// Create the Player model
const Player = mongoose.model('Player', playerSchema);

// Add sample data
Player.insertMany([
  {
    name: 'Player 1',
    position: 'Quarterback',
    rushingYards: 200,
    touchdownsThrown: 15,
    sacks: 5,
    fieldGoalsMade: 10,
    fieldGoalsMissed: 2,
    catchesMade: 0,
  },
  {
    name: 'Player 2',
    position: 'Running Back',
    rushingYards: 800,
    touchdownsThrown: 5,
    sacks: 2,
    fieldGoalsMade: 2,
    fieldGoalsMissed: 1,
    catchesMade: 20,
  },
  // Add more sample players here
]);

// Perform queries
async function performQueries() {
  // 1. Find the Player with the most touchdown passes
  const mostTouchdownPasses = await Player.findOne().sort('-touchdownsThrown');
  console.log('Player with the most touchdown passes:', mostTouchdownPasses.name);

  // 2. Find the Player with the most rushing yards
  const mostRushingYards = await Player.findOne().sort('-rushingYards');
  console.log('Player with the most rushing yards:', mostRushingYards.name);

  // 3. Find the Player with the least rushing yards
  const leastRushingYards = await Player.findOne().sort('rushingYards');
  console.log('Player with the least rushing yards:', leastRushingYards.name);

  // 4. List players sorted by most to fewest field goals made
  const playersByFieldGoalsMade = await Player.find().sort('-fieldGoalsMade');
  console.log('Players sorted by most to fewest field goals made:', playersByFieldGoalsMade);

  // 5. Find the Player with the most number of sacks
  const mostSacks = await Player.findOne().sort('-sacks');
  console.log('Player with the most sacks:', mostSacks.name);
}

// Perform the queries
performQueries();

node team.js

