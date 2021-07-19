const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /note_analytics /view_analytics and /seek_analytics.
const analyticsRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

//  get a list of all note analytics.
analyticsRoutes.route("/note_analytics").get(function (req, res) {
  let db_connect = dbo.getDb("note_together");
  db_connect
    .collection("note_analytics")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get a list of all view analytics
analyticsRoutes.route("/view_analytics").get(function (req, res) {
    let db_connect = dbo.getDb("note_together");
    db_connect
      .collection("view_analytics")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  // get list of all  seek analytics
analyticsRoutes.route("/seek_analytics").get(function (req, res) {
    let db_connect = dbo.getDb("note_together");
    db_connect
      .collection("seek_analytics")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

// Add note analytic
analyticsRoutes.route("/note_analytics/add").post(function (req, res) {
  let db_connect = dbo.getDb("note_together");
  let myobj = {
    video: req.body.video,
    timestamp: req.body.timestamp,
    tag: req.body.tag,
    created_at: Date()
  };
  db_connect.collection("note_analytics").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
});

// Add view analytic
analyticsRoutes.route("/view_analytics/add").post(function (req, res) {
    let db_connect = dbo.getDb("note_together");
    let myobj = {
      video: req.body.video,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      created_at: Date()
    };
    db_connect.collection("view_analytics").insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
  });

  // Add seek analytic
analyticsRoutes.route("/seek_analytics/add").post(function (req, res) {
    let db_connect = dbo.getDb("note_together");
    let myobj = {
      video: req.body.video,
      timestamp: req.body.timestamp,
      created_at: Date()
    };
    db_connect.collection("seek_analytics").insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
  });

module.exports = analyticsRoutes;