const { user, transaction } = require("../../models")
const cloudinary = require("../utils/cloudinary")
const IMAGE_PATH = process.env.PATH_FILE || `http://localhost:5000/uploads/`

// Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.filename, {
      folder: "dumbsound-file",
      use_filename: true,
      unique_filename: false,
    })
    const newPayment = await transaction.create({
      startDate: null,
      dueDate: null,
      attache: result.public_id,
      userId: req.id.id,
      status: "Pending",
    })
    let data = await transaction.findOne({
      where: { id: newPayment.id },
      include: {
        model: user,
        as: "user",
        attributes: ["id", "fullName", "email", "subscribe"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    })

    data = JSON.parse(JSON.stringify(data))
    res.status(200).send({
      status: "success",
      data: { ...data, attache: IMAGE_PATH + data.attache },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "failed", msg: "Add transaction error" })
  }
}

// Get all transaction list
exports.getTransaction = async (req, res) => {
  try {
    console.log(req.id)
    if (req.id.listAs === 1) {
      let data = await transaction.findAll({
        include: {
          model: user,
          as: "user",
          attributes: ["fullName", "subscribe"],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
      })

      data = JSON.parse(JSON.stringify(data))
      data.map((item, index) => {
        item.attache = IMAGE_PATH + item.attache
        return { ...item }
      })

      res.status(200).send({
        data,
      })
    } else {
      res.status(401).send({
        status: "Only Admin!",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      msg: "Failed to get all transaction",
    })
  }
}

// Approve incoming transaction
exports.approveTransaction = async (req, res) => {
  try {
    if (req.id.listAs === 1) {
      const today = new Date()
      const dueDate = new Date(new Date().setDate(today.getDate() + 30))
      await transaction.update(
        { status: "Approve", dueDate, startDate: today },
        {
          where: { id: req.params.idTransaction },
        }
      )
      let data = await transaction.findOne({
        where: { id: req.params.idTransaction },
      })
      await user.update(
        { subscribe: 1 },
        {
          where: { id: data.userId },
        }
      )
      res.status(200).send({
        status: "success",
      })
    } else {
      res.status(401).send({
        status: "Only Admin!",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "failed", msg: "Cannot approve Status" })
  }
}

// Cancel incoming transaction
exports.cancelTransaction = async (req, res) => {
  try {
    if (req.id.listAs === 1) {
      await transaction.update(
        { status: "Cancel", startDate: null, dueDate: null },
        {
          where: { id: req.params.idTransaction },
        }
      )
      let data = await transaction.findOne({
        where: { id: req.params.idTransaction },
      })
      await user.update(
        { subscribe: 0 },
        {
          where: { id: data.userId },
        }
      )
      res.status(200).send({
        status: "success",
      })
    } else {
      res.status(401).send({
        status: "Only Admin!",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "failed", msg: "Cannot cancel Status" })
  }
}

// Delete incoming transaction
exports.deleteTransaction = async (req, res) => {
  try {
    let data = await transaction.findOne({
      where: { id: req.params.idTransaction },
    })
    if (req.id.listAs === 1) {
      if (data.attache) {
        cloudinary.uploader.destroy(data.attache, function (error, result) {
          console.log(result, error)
        })
      }
      await transaction.destroy({
        where: { id: req.params.idTransaction },
      })
      await user.update(
        { subscribe: 0 },
        {
          where: { id: data.userId },
        }
      )
      res.status(200).send({
        status: "success",
      })
    } else {
      res.status(401).send({
        status: "Only Admin!",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "failed", msg: "Cannot delete transaction" })
  }
}

// Update status user
exports.updateStatus = async (req, res) => {
  try {
    if (req.id.listAs === 1) {
      const transactionData = await transaction.findOne({
        where: { id: req.params.idTransaction },
      })
      await transaction.update(
        { startDate: null, dueDate: null },
        {
          where: { id: transactionData.id },
        }
      )
      console.log("update ", user, transactionData.userId)
      await user.update(
        { subscribe: 0 },
        {
          where: { id: transactionData.userId },
        }
      )
      res.status(200).send({
        status: "success",
      })
    } else {
      res.status(401).send({
        status: "Only Admin!",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "Failed",
      message: "Cannot update status",
    })
  }
}
