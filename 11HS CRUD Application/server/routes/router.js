const express = require("express");
const router = express.Router();
const departments = require("../models/departmentSchema");

/*router.get("/",(req,res)=>{
    console.log("connect");
});
*/
//adding subject and posting it to mongodb(save to database)
router.post("/Add_subject",async(req,res)=>{
    const {department,subject,content} = req.body;
    if(!department || !subject || !content){
        res.status(422).json("please fill the data");
    }
    try{
        const preSubject = await departments.findOne({subject:subject});
        const preDepartment = await departments.findOne({department:department});
        console.log(preSubject);
        console.log(preDepartment);
        if(preSubject && preDepartment){
            res.status(422).json("this department's subject is already present ");
        }else{
            const addSubject = new departments({
                department,subject,content
            });
            await addSubject.save();
            res.status(201).json(addSubject);
            console.log(addSubject);
        }
    } catch (error){
        res.status(422).json(error)
    }
});

//getting the data from the database
router.get("/getdata", async(req,res)=>{
    try{
        const subData = await departments.find();
        res.status(201).json(subData)
        console.log(subData);
    } catch(error) {
        res.status(422).json(error);
    }
})
//get individual subject and also adding the update option there
router.get("/getsubject/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const subjectIndividual = await departments.findById({_id:id});
        console.log(subjectIndividual);
        res.status(201).json(subjectIndividual)
    } catch (error) {
        res.status(422).json(error)
    }
})
//update the subject
router.patch("/updatesubject/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const updatesubject = await departments.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updatesubject);
        res.status(201).json(updatesubject);
    } catch(error) {
        res.status(422).json(error);
    }
})
//delete the subject
router.delete("/deletesubject/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const deletesubject = await departments.findByIdAndDelete({_id:id});
        console.log(deletesubject);
        res.status(201).json(deletesubject);
    } catch(error) {
        res.status(422).json(error);
    }
})
module.exports = router;