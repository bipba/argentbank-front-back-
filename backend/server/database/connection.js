const mongoose = require('mongoose');
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB';

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Ajouter cette ligne
      useFindAndModify: false,  // Désactiver findAndModify
    });
    console.log('Database successfully connected');
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw new Error(error);
  }
};









// const mongoose = require('mongoose')
// const databaseUrl =
//   process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB'

// module.exports = async () => {
//   try {
//     await mongoose.connect(databaseUrl, { useNewUrlParser: true })
//     console.log('Database successfully connected')
//   } catch (error) {
//     console.error(`Database Connectivity Error: ${error}`)
//     throw new Error(error)
//   }
// }
