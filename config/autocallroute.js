const cron = require("node-cron");
const moment = require("moment-timezone");
function callroute(routename, time) {
  cron.schedule("0 9 * * *", () => {
    // Use moment-timezone to check if the current time is in the specified timezone
    const now = moment().tz("Asia/Kathmandu");
    if (now.hours() === parse(int(time))) {
      fetch(routename) // Assuming your server is running locally
        .then((response) =>
          console.log("Route triggered:", response.statusText)
        )
        .catch((error) => console.error("Error triggering route:", error));
    }
  });
}
module.exports = callroute;