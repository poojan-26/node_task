// const responseHelper = require('../../utils/responseHelper');
const User = require('../models/users');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');
    
   const getUser =  async (req, res)  => {
       try{
        const getUser = await User.find();
        res.status(200).json(getUser);
       }catch (error) {
        console.log(error);
    }
   }

   const createUser =  async (req, res) => {
    let create = req.body;
    const newUser = new User(create);
        try {
            const result = await newUser.save();
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }

   const findOne =  async (req, res) => {
        try {
            const userDetails = await User.findOne({_id: req.params.id});
            res.status(200).json(userDetails);
        } catch (error) {
            console.log(error)
        }
    }

 const updateUser = async(req, res) => {
    const id = req.params.id;
    console.log("id========", id);
        try {
            let updateObj = { ...req.body };
            const result = await User.findByIdAndUpdate(id, updateObj, {
                new: true,
              });
              console.log("result", result);
              return res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }

    const updateMany = async (req, res) =>{
        try {
                let updateObj = { ...req.body };
                const result = await User.updateMany({lastName: req.params.lastname}, {$set: updateObj});
                  console.log("result", result);
                  return res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }
   
    const connectRole = async (req, res) => {
        // try {
        //   const getStudent = await teacher.find();
        //   res.status(200).json(getStudent);
        // } catch (error) {
        //   res.status(404).json({ message: error.message });
        // }
          try {
          console.log("hhhhhhhh")
          const result = await teacher.aggregate([
            {
              $lookup: {
                from: "roles",
                localField: "roleId",
                foreignField: "_id",
                as: "role",
              },
            },
          ]);
          result.forEach((data) => {
            if (data.school.length > 0) {
              data.schoolName = data.school[0].schoolName;
            } else {
              data.schoolName = "NAAAA";
            }
          });
          console.log("result", result);
          res.status(200).json(result);
        } catch (error) {
          console.log(error);
        }
      };
    
  const deleteUser = async(req, res) => {
    const id = req.params.id;    
    try {
        const deleteUser = await User.findByIdAndRemove(id);
        console.log("result", deleteUser);
        res.status(200).json(deleteUser);
        } catch (error) {
            console.log(error)
        }
    }



    // async userpage(req, res) {
    //     try {
    //         let {page, size} =req.query;
    //         if (!page){
    //             page =1;
    //         }
    //         if (!size){
    //             size =1;
    //         }
    //         const limit = parseInt(size);
    //         const skip = (page - 1) * size;
    //         const user = await User.find().limit(limit).skip(skip);
    //         console.log(user)
    //         // let users = await usersHelper.userpage(req.body)
    //         responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, { total: user.length, page_no:page, users:user })
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }

   const signUp =  async (req, res) => {
        try {
                    // bcrypt.hash(req.body.password, 10, function(err, hash){
                        // if (err){
                        //     throw err;
                        // }else{
                        //     let user = {
                        //         firstName: req.body.firstName,
                        //         lastName: req.body.lastName,
                        //         email: req.body.email,
                        //         username: req.body.username,
                        //         password: hash,
                        //         address: {
                        //                     street: req.body.address.street,
                        //                     city: req.body.address.city,
                        //                     state: req.body.address.state,
                        //                     zipcode:req.body.address.zipcode
                        //                 }          
                        //     }
                        //     new User(user).save();
                        //    console.log("result", user);
                        //    return res.status(200).json(user);
                        const email = req.body.email;
                        const roleId = req.body.roleId;
                        let signupDetails = await User.findOne({ $and: [{ email }, { roleId }]})
                        console.log("signupDetails", signupDetails)
                        if (signupDetails)
                        {
                            return res
                            .status(400)
                            .json("User already existed in role with given email!");
                        }
                        bcrypt.hash(req.body.password, 10, function(err, hash){
                        let user = {
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    email: req.body.email,
                                    username: req.body.username,
                                    password: hash,
                                    address: {
                                                street: req.body.address.street,
                                                city: req.body.address.city,
                                                state: req.body.address.state,
                                                zipcode:req.body.address.zipcode
                                            } ,
                                    roleId: req.body.roleId         
                                }
                                new User(user).save();
                               console.log("result", user);
                               return res.status(200).json(user);
                        // }
                        })            
                    
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }

   const signIn =  async(req, res) => {
        try {
           const email = req.body.email;
           const password = req.body.password;
           if (email == "" || password == ""){
            console.log("Empty credential supplied");
            res.status(401).json("Empty credential supplied");
            return ("Empty credential supplied");
    }
    const user = await User.find({email:email})
    if (user.length<1){
        res.status(401).json("user not exist");
        return ("user not exist");
    }
 if(user){
    if (await bcrypt.compare(password, user[0].password)){
        const token = jwt.sign({
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email}, 'secretkey', { expiresIn:'24h'} )
            return res.status(200).json({ firstname: user[0].firstname,
                lastname: user[0].lastname,
                email: user[0].email,Token: token});
            // return ({ firstname: user[0].firstname,
            //     lastname: user[0].lastname,
            //     email: user[0].email,Token: token}); 
    }else{
        res.status(401).json("password is not correct");
        return ("password is not correct");
    }
 }
        } catch (error) {
            console.log(error)
            
        }
    }


    
   
    module.exports = {
        getUser: getUser,
        createUser: createUser,
        findOne:findOne,
        updateUser: updateUser,
        updateMany: updateMany,
        connectRole:connectRole,
        deleteUser:deleteUser,
        signUp:signUp,
        signIn:signIn,
      };