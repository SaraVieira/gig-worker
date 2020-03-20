export const users = () => {
  return db.user.findMany()
}

export const createUser = ({ input }) => {
  console.log(db.user)
  return db.user.create({ data: input })
}

export const user = ({ id }) => {
  return db.user.findOne({
    where: { id: id },
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id: id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id: id },
  })
}
