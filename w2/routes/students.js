const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
    try {
  const students = await Student.findAll()
  res.json(students)
  }
    catch (err){
      next(err)
    }
  })

router.get('/:id', async (req, res, next) => {
  const student = await Student.findById(req.params.id)

  try {
  if (student) {
  res.json(student)
  } else {
    res.status(404).send()
  }
}
  catch (err) {
    next(err)
  }

})

router.post('/', async (req, res, next) => {

  // const newStudent = await Student.create({
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   email: req.body.email
  // })
  const newStudent = await Student.create(req.body)
  res.status(201).json(newStudent)
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const student = await Student.findById(id)
  const updated = await student.update(req.body)
  res.json(updated)
})

router.delete('/:id', async (req, res, next) =>{
  const id = req.params.id
  const student = await Student.findById(id)
  const deleted = await student.destroy(student)
  res.status(204).json(deleted)
})



module.exports = router;
