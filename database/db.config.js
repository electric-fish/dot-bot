const dbconfig = {
  username: "admin",
  password: "adventurerun",
  db_name: "dotbot-db",
  collection_name: "tiles",
  uri: `mongodb+srv://admin:adventurerun@cluster0.rb2xk.gcp.mongodb.net/dotbot-db?retryWrites=true&w=majority`,
};

module.exports = dbconfig;