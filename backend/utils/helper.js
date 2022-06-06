const { Sonyflake } = require("sonyflake");
const machineNo = process.env.MACHINE_NO || 0; // default 0: first process
const epoch_date = Date.UTC(2020, 01, 01, 0, 0, 0);
const SONYFLAKE_ID = new Sonyflake({
  machineId: machineNo * 10 + 0, // 0 = type image
  epoch: epoch_date,
});
module.exports = {
  createID: () => {
    return SONYFLAKE_ID.nextId();
  },
};
