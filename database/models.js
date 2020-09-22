const client = require('./index.js');
const dbconfig = require('./db.config.js');

const models = {

  getUser: (id) => {
    console.log("getUser: " + id);
    return new Promise((resolve, reject) => {
      const db = client.db(dbconfig.db_name);  
      db.collection(dbconfig.collection_name).find({}).filter({"history.user": id}).toArray()
        .then((result) => {
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
      db.collection(dbconfig.collection_name).find({}).filter({"location": location}).toArray()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  postTile: () => {

  },

//   getCanvas: () => {
//     return new Promise((resolve, reject) => {
//       const db = client.db(db_name);

//       db.collection(collection_name).find({}).toArray()
//         .then((result) => {
//           resolve(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   },
  
//   getCanvasWithId: (canvasId) => {
//     return new Promise((resolve, reject) => {
//       const db = client.db(db_name);

//       var id = parseInt(canvasId);
//       db.collection('canvases').findOne({_id: id})
//         .then((result) => {
//           // console.log(result);
//           resolve(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
        
//     });
//   },

//   getCanvasList: () => {
//     return new Promise((resolve, reject) => {
//       const db = client.db(db_name);

//       db.collection('canvas_list').find({}).toArray()
//         .then((result) => {
//           resolve(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   },

//   postPixel: (pixelData) => {
//     return new Promise((resolve, reject) => {
//       const db = client.db(db_name);
//       const collection = db.collection(collection_name);

//       db.collection(collection_name).updateOne({ rowNum: pixelData.rowNum, colNum: pixelData.colNum }, { $set: pixelData }, { upsert: true })
//         .then(() => {
//           resolve();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   },

//   postPixelWithId: (pixelData, canvasId) => {
//     return new Promise((resolve, reject) => {
//       var id = parseInt(canvasId);

//       const db = client.db(db_name);
//       const collection = db.collection(collection_name);

//       // console.log(pixelData);
      
//       db.collection('canvases')
//       .updateOne({ _id: 1,
//                    "data.rowNum": 0,
//                    "data.colNum": 0 },
//                  { $set:
//                    { "data.$":
//                          {
//                            "rowNum": 0,
//                            "colNum": 0,
//                            "RGBA_channels": [6,6,6,6],
//                            "lastEditedBy": 'fish',
//                            "lastedEditedAt": 'death',
//                          },
//                    }
//                  },
//                  { upsert: true })
//         .then(() => {
//           resolve();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   },

};

module.exports = models;