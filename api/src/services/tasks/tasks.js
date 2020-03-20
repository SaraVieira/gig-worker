export const tasks = () => {
  return db.task.findMany()
}

export const createTask = ({ input }) => {
  return db.task.create({ data: input })
}

export const task = ({ id }) => {
  return db.task.findOne({
    where: { id: id },
  })
}

export const updateTask = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id: id },
  })
}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id: id },
  })
}
