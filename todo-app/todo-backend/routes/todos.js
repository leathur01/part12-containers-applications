const express = require('express');
const { Todo } = require('../mongo')
const { client } = require('./../redis/index')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  // await client.set('count', '1')
  const count = await client.get('count')
  if (count) {
    const temp = await client.set('count', parseInt(count) + 1)
    console.log(temp)
  } else {
    const temp = await client.set('count', 1)
    console.log(temp)
  }

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) {
    return res.sendStatus(404)
  }

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  if (todo) {
    return res.json(todo)
  }

  res.sendStatus(405)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.body

  console.log(todo)
  const newTodo = await Todo.findByIdAndUpdate(req.todo._id, { ...todo }, { new: true, useFindAndModify: false, });
  if (newTodo) {
    return res.json(newTodo);
  }

  res.sendStatus(405)
});

router.get('/statistics', async (req, res) => {
  const count = await client.get('count');

  return res.json({ added_todos: count ? parseInt(count) : 0 });
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
