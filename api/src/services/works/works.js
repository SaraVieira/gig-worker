export const works = () => {
  return db.work.findMany()
}

export const createWork = ({ input }) => {
  return db.work.create({ data: input })
}

export const work = ({ id }) => {
  return db.work.findOne({
    where: { id: id },
  })
}

export const updateWork = ({ id, input }) => {
  return db.work.update({
    data: input,
    where: { id: id },
  })
}

export const deleteWork = ({ id }) => {
  return db.work.delete({
    where: { id: id },
  })
}
