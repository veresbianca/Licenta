const mongoose = require('mongoose');
const username = "bianca";
const password = "bianca";
const cluster = "cluster0.udhwrsn";
const dbname = "fitnessDatabase";

// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost/fitnessDB',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);



module.exports = mongoose.connection;