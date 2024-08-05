const dbs = require("../data/database");
const model = require("../models/todo");

async function find(req, res) {
    const data=await model.fetchAll();
    res.json({
                 data:data,
                 message:"sucessfull"
             })
         }


async function post(req,res) {
    const data = req.body.message;
    const dataobj = new model(data);
    let _id;
    try
    {
         _id = await dataobj.insert();
    }catch(error){
        console.log(error)
    }
   
    const id = _id.insertedId.toString()
    res.json({
        message: "The message is successfully added",
        _id: id
    });

}
async function update(req,res) {
    const id=req.params.id;
    const data=req.body.message;
    const obj=new model(data,id);
    let acknowledgment;
    try{
     acknowledgment=await obj.update();
    }
    catch(error){
        console.log(error);
    }
    res.json({message:"The data is added successfully"})
}

async function cancel(req,res) {
    const id=req.params.id;
    const data=req.body.message;
    const obj=new model(data,id);
    try
    {
        await obj.delete();
    }
    catch(error)
    {
        console.log(error);
    }
    res.json({message:"The data is deleted successfully"})
}

module.exports = {
    find:find,
    post: post,
    update: update,
    cancel: cancel
}