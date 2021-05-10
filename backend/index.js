const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const moment = require("moment");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.post("/api/getslots", async (req, res) => {
  const { email, age, pincode } = req.body;
  //cron.schedule("* * * * *", async () => {
  await getSlotsAvailability();
  //});
  async function getSlotsAvailability() {
    let datesArray = await fetchUpcomingData();
    datesArray.forEach((date) => {
      getSlotsForDate(date);
    });
  }

  function getSlotsForDate(date) {
    let config = {
      method: "get",
      url:
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
        pincode +
        "&date=" +
        date,
      headers: {
        accept: "application/json",
        "Accept-Language": "hi_IN",
      },
    };

    axios(config)
      .then(function (slots) {
        let sessions = slots.data.sessions;
        let validSlots = sessions.filter(
          (slot) => slot.min_age_limit <= age && slot.available_capacity > 0
        );
        console.log({ date: date, validSlots: validSlots.length });
        res.json({
          success: true,
        });
        if (validSlots.length > 0) {
          getNotification(validSlots);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getNotification(validSlots) {
    let slotDetails = JSON.stringify(validSlots, null, "\t");
    console.log(slotDetails);
    // notifier.sendEmail(
    //   email,
    //   "Available Vaccine Slots",
    //   slotDetails,
    //   (err, result) => {
    //     if (err) {
    //       console.error({ err });
    //     }
    //   }
    // );
  }

  async function fetchUpcomingData() {
    let dates = [];
    let today = moment();
    console.log("data");
    for (let i = 0; i < 10; i++) {
      let dateString = today.format("DD-MM-YYYY");
      dates.push(dateString);
      today.add(1, "day");
    }
    console.log(dates);
    return dates;
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
