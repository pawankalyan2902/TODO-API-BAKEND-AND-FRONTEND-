const dbs=require("../data/database");
const mongodb=require("mongodb");
const objectId=mongodb.ObjectId

class Todo{
    constructor(message,id){
        this.message=message,
        this.id=id
    }
   async insert()
    {
        const data=await dbs.getDb().collection("todo").insertOne({message:this.message});
        return data;//returns the id of that data stored
    }
    static async fetchAll()
    {
        const data=await dbs.getDb().collection("todo").find({}).toArray();
        return data;
    }
    async update()
    {
        let id=new objectId(this.id);
        if(this.id)
        {
            try
            {
                return await dbs.getDb().collection("todo").updateOne({_id:id},{$set:{message:this.message}});
            }
            catch(error)
            {
                console.log("error");
            }
        }
    }
    async delete()
    {
        let id=new objectId(this.id);
         await dbs.getDb().collection("todo").deleteOne({_id:id});
    }
}

module.exports=Todo;