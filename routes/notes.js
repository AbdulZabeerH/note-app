var express = require('express');
var router = express.Router();
const {addnotes,getnotes,updatenotes,deletenote,sendmail} = require('../controllers/notes')


router.post('/addnotes',addnotes);
router.get('/getnotes/:emailId',getnotes);
router.put('/updatenote',updatenotes);
router.post('/deletenote',deletenote);
router.post('/sendmail',sendmail);

module.exports = router;