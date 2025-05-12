const express= require("express")
const router = express.Router();

const staffController = require("../controllers/staffController")

router.post("/", staffController.createStaff)

router.get("/", staffController.getAllStaff);

router.delete("/:id", staffController.deleteStaff)

router.put("/:id", staffController.updateStaff)

module.exports=router