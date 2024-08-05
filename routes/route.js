const express=require("express");
const router=express.Router()

const controller=require("../controllers/controller");

router.get("/",controller.find);

router.post("/",controller.post);

router.patch("/:id",controller.update);

router.delete("/:id",controller.cancel);

module.exports=router;