const Reminder = require("../Models/reminder.module");
const nodemailer = require("nodemailer");


setInterval(async () => {
  const data = await Reminder.find({});
  if (data) {
    data.forEach(async (element) => {
      const now = new Date();
      if (new Date(element.datetime) - now < 0) {
        if (!element.isReminded) {
          async function main() {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "naman28112000@gmail.com",
                pass: "gqlyvmblpzvnwknx",
              },
            });

            const mailOptions = {
              from: "naman28112000@gmail.com",
              to: `${element.caretakeremail}`,
              subject: "Reminder for medicine",
              text: `time to take ${element.medicinename}`,
            };

            try {
              const result = await transporter.sendMail(mailOptions);
              console.log("Email send");
            } catch (error) {
              console.log("Email send failed ", error);
            }
          }
          main();
          const data = await Reminder.findByIdAndUpdate(element.id, {
            isReminded: true,
          });
        }
      }
    });
  }
}, 1000);

exports.createReminder = async (req, res) => {
  try {
    const { medicinename, datetime, caretaker, caretakeremail } = req.body;

    const data = await Reminder({
      medicinename,
      datetime,
      caretaker,
      caretakeremail,
      isReminded: false,
    }).save();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getReminders = async (req, res) => {
  try {
    const data = await Reminder.find({});
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { isReminded } = req.body;
    const data = await Reminder.findByIdAndUpdate(id, { isReminded });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Reminder.findByIdAndDelete({ _id: id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};
