const MaintenanceRecord = require("../Models/MaintenanceRecord");

const createRecord = async (req, res) => {
    // req.body[0] is the schedule id, req.body[1] is the array element
    const schedId = req.body[0];
  
    const doc = await MaintenanceRecord.exists({ schedID: schedId });
  
    console.log("Result :", doc);
    if (doc) {
      console.log("true, add into");
      const updatedoc = await MaintenanceRecord.findOneAndUpdate(
        { schedID: schedId },
        { $push: { records: req.body[1] } }
      );
      console.log(updatedoc);
    } else {
      console.log("false create one");
      const maintrecord = {
        schedID: schedId,
        records: [req.body[1]],
      };
      const newrecord = await MaintenanceRecord.create(maintrecord);
      console.log(newrecord);
      res.send(newrecord);
    }
  };
  
  module.exports = {
    createRecord,
  };