// const responseHelper = require('../../utils/responseHelper');
const Role = require('../models/role');
    
   const getRole =  async (req, res)  => {
       try{
        const getRole = await Role.find();
        console.log(getRole)
        res.status(200).json(getRole);
       }catch (error) {
        console.log(error);
    }
   }

   const createRole =  async (req, res) => {
    let create = req.body;
    const newRole = new Role(create);
        try {
            const result = await newRole.save();
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }

   const findOne =  async (req, res) => {
        try {
            const roleDetails = await Role.findOne({_id: req.params.id});
            res.status(200).json(roleDetails);
        } catch (error) {
            console.log(error)
        }
    }

 const updateRole = async(req, res) => {
    const id = req.params.id;
    console.log("id========", id);
        try {
            let updateObj = { ...req.body };
            const result = await Role.findByIdAndUpdate(id, updateObj, {
                new: true,
              });
              console.log("result", result);
              return res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }
    
  const deleteRole = async(req, res) => {
    const id = req.params.id;    
    try {
        const deleteTeacher = await Role.findByIdAndRemove(id);
        console.log("result", deleteTeacher);
        res.status(200).json(deleteTeacher);
        } catch (error) {
            console.log(error)
        }
    }

    const userList = async(req, res) =>{
        try {
            const searchedField = req.query.roleName;
            // const result = await Role.find({rolename}, {roleName:1, accessModual:1});
            const result = await Role.find({roleName:{$regex: searchedField, $options:`$i`}}, {roleName:1, accessModual: 1})
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }




    module.exports = {
        getRole: getRole,
        createRole: createRole,
        findOne:findOne,
        updateRole: updateRole,
        deleteRole:deleteRole,
        userList: userList
      };