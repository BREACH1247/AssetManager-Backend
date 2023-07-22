const mongoose = require("mongoose")

const maintenanceData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: false
    }
},
{
    timestamps: true
}
)

const maintenanceRecord = new mongoose.Schema({
    schedID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssetScheduling',
        required: true
    },
    records: [maintenanceData]
});

const maintenanceRec = mongoose.model('maintenanceRec', maintenanceRecord);

module.exports = maintenanceRec;
