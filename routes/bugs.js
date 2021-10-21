const router = require("express").Router()
const Bug = require('../models/bug')
const path = require("path")

//Configure Storage
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads/'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'-'+ file.originalname)
      
    }
  })
const upload = multer({ storage: storage })


//Get All bugs
router.get('/', async (req, res) => {
    try {
      const bugs = await Bug.find({})
      res.status(200).json({bugs})
    } catch (error) {
      res.status(400).json({msg:'Server Error'})
    }
})

// ADD Bug
router.post('/', upload.single('capture'), async (req, res) => {
    console.log(req.file)
    /*console.log(req.body)*/

    const {title, description, priority} = req.body
    const capture = req.file.filename
    try {
      const bug = Bug({
        title,
        description,
        priority,
        capture
      })
      const bugSaved = await bug.save()
      return res.status(200).json({msg:"OK", bugSaved})
    } catch (error) {
      res.status(400).json({msg:error})
    }
})

//Get a bug
router.get('/:id', async (req, res)=>{
  const id = req.params.id
  try {
  
    const bug = await Bug.findById(id)
    return res.status(200).json({msg:"OK", bug})
  } catch (error) {
    res.status(400).json({msg:error})
  }
})


//Update Bug
router.put('/:id', async (req, res) => {
  const id = req.params.id
  try {
    await Bug.findByIdAndUpdate(id, {$set:{isResolved:true}})
    return res.status(200).json({msg:"Bug Updated", bug})
  } catch (error) {
    res.status(400).json({msg:error})
  }

})

//Delete Bug
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
  
    const bug = await Bug.findByIdAndDelete(id)
    return res.status(200).json({msg:"Bug Deleted"})
  } catch (error) {
    res.status(400).json({msg:error})
  }
})

module.exports = router