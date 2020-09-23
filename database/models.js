const client = require('./index.js');
const dbconfig = require('./db.config.js');

const models = {

  getUser: (user) => {
    // console.log("getUser: " + user.id);
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);  
    //   db.collection('users').find({}).filter({"userid": user.id}).toArray()
      db.collection('tiles').find({}).filter({"history.userid": user.id}).toArray()
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
    // console.log("getTile: (" + location[0] + ", " + location[1] + ")");
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
      "status": "active",
      "userid": user.id,
      "history": [{
        "userid": user.id,
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
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  },

  reserveTile: (user, location, comment, data) => {
    data.status = "active";
    data.userid = user.id;
    data.history.push({
      "userid": user.id,
      "action": "reserve",
      "timestamp": new Date(),
      "comment": comment
    });
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);
      db.collection('tiles').updateOne({"location":location}, {$set: data})
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  },
  
  clearTile: (user, location, comment, data) => {
    console.log("clearTile()");
    data.status = "inactive";
    data.userid = user.id;
    data.history.push({
      "userid": user.id,
      "action": "clear",
      "timestamp": new Date(),
      "comment": comment
    });
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);
      db.collection('tiles').updateOne({"location":location}, {$set: data})
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  },

  dropTile: (user, location, comment, data) => {
    console.log("clearTile()");
    data.status = "inactive";
    data.userid = user.id;
    data.history.push({
      "userid": user.id,
      "action": "drop",
      "timestamp": new Date(),
      "comment": comment
    });
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);
      db.collection('tiles').updateOne({"location":location}, {$set: data})
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  },

  /*
  insertUser: (user, location, comment, status) => {
    let data = {
      "location": location,
    //   "status": status,
      "userid": user.id,
      "username": `${user.username}#${user.discriminator}`,
      "history": [{
        "location": location,
        "action": status,
        "timestamp": new Date(),
        "comment": comment 
      }],
    }
    data.status = (status === 'reserve') ? "Reserving" : "Inactive";
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);
      db.collection('users').insertOne(data)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  },
  */

  /*
  updateUser: (user, location, comment, status, data) => {
    data.location = location;
    data.status = (status === 'reserve') ? "Reserving" : "Inactive";
    data.history.push({
      "location": location,
      "action": status,
      "timestamp": new Date(),
      "comment": comment
    });
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);
      db.collection('users').updateOne({"userid":user.id}, {$set: data})
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
  */

}

module.exports = models;