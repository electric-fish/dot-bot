const client = require('./index.js');
const dbconfig = require('./db.config.js');

const models = {

  getUser: (user) => {
    console.log("getUser: " + user.id);
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);  
      db.collection('users').find({}).filter({"userid": user.id}).toArray()
        .then((result) => {
        //   console.log(result);
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  getTile: (location) => {
    console.log("getTile: (" + location[0] + ", " + location[1] + ")");
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);  
      db.collection('tiles').find({}).filter({"location": location}).toArray()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  insertTile: (user, location, comment) => {      
    let data = {
      "location": location,
      "status": "Reserved",
      "user": user.id,
      "history": [{
        "user": user.id,
        "action": "reserve",
        "timestamp": new Date(),
        "comment": comment 
      }],
    }
    // console.log(data);
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);
      db.collection('tiles').insertOne(data)
        .then(() => {
          console.log("insertTile() has been run.");
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  reserveTile: (user, location, comment, tile) => {
    tile.status = "Reserved";
    tile.user = user.id;
    tile.history.push({
      "user": user.id,
      "action": "reserve",
      "timestamp": new Date(),
      "comment": comment
    });
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);
      db.collection('tiles').updateOne({"location":location}, {$set: tile})
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  
  clearTile: (user, location) => {

  },

  dropTile: (user, location) => {

  },

  insertUser: (user, location, status) => {
    // return new Promise((resolve, reject) => {
    //     const db = client.db(db_name);
    //     const collection = db.collection(collection_name);
  
    //     db.collection('users').updateOne({}, {}, { upsert: true })
    //       .then(() => {
    //         resolve();
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   });
  },

  updateUser: (user, location, status) => {
    // return new Promise((resolve, reject) => {
    //     const db = client.db(db_name);
    //     const collection = db.collection(collection_name);
  
    //     db.collection('users').updateOne({}, {}, { upsert: true })
    //       .then(() => {
    //         resolve();
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   });
  }
}

module.exports = models;