const notes = require("../models/notes");
var nodemailer = require('nodemailer');
exports.addnotes = (req, res) => {
  notes.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "No Email id found",
      });
    }
    if (data == null) {
      const note = new notes(req.body);
      note.save((err, notedata) => {
        if (err) {
          return res.status(400).json({
            err: "Not able to save note in DB",
          });
        }
        return res.status(200).json({
          notedata,
          msg: "Note is been Created",
        });
      });
    } else {
      notes
        .updateOne(
          { email: req.body.email },
          { $push: { notes: req.body.notes } },
          { useFindAndModify: true }
        )
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              err: "Not able to save note in DB",
            });
          }
          return res.status(200).json({
            data,
            msg: "New note is been Created",
          });
        });
    }
  });
};

exports.getnotes = (req, res) => {
  notes.findOne({ email: req.params.emailId }, (err, data) => {
    if (err) {
      return res.status(400).json({
        err: "No Data",
      });
    }
    return res.status(200).json({
      data,
    });
  });
};

exports.deletenote = (req, res) => {
  notes.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return res.status(400).json({
        err: "Error in deleting data",
      });
    }
    //console.log(data)
    let notedata = data.notes.filter((el) => el.title != req.body.deletetitle);
    let noteobj = {
      email: req.body.email,
      notes: notedata,
    };
    const note = new notes(noteobj);
    note.save((err, notedata) => {
      if (err) {
        return res.status(400).json({
          error: "Error in deleting the note",
        });
      }
      return res.json({
        notedata,
        msg: "Note is been Deleted",
      });
    });
    notes.deleteOne({ _id: data._id }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "can't delete old data",
        });
      }
      return res.json({ data, msg: "Note is been Deleted" });
    });
  });
};

exports.updatenotes = (req, res) => {
  notes.findOneAndUpdate(
    { email: req.body.email },
    { $set: req.body },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          err: "Error in Updating data",
        });
      }
      return res.json({data,msg:"Note is been updated"})
    }
  );
};

exports.sendmail = (req,res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abdulzabeerh@gmail.com',
      pass: '9036111375'
    }
  });
  var pixel = 'data:application/pdf;filename=generated.pdf;base64,'+req.body.emailcontent
 //var buffer = new Buffer(pixel.split("base64,")[1], "base64"); 
  var mailOptions = {
    from: 'abdulzabeerh@gmail.com',
    to: req.body.emailId,
    subject: 'Email With File By Abdul',
    text: 'Your Salary Slip is here'+' '+ req.body.filename,
    attachments:[
      {
        filename:"File1.pdf",
        path:pixel
      }
    ]
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return res.status(400).json({
        error:"Email Can't be send"
      })
    }
    return res.status(200).json({
      msg:"Email is successfully send"
    })
  });
}

