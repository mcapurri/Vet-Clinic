const { Schema, model } = require("mongoose");

const calendarTokenSchema = new Schema(
  {
    accessToken: String,
    refreshToken: String,
    accessTokenExpiryDate: Date,
    scope: String,
  },
  {
    timestamps: true,
  }
);

const CalendarToken = model("CalendarToken", calendarTokenSchema);

module.exports = CalendarToken;
