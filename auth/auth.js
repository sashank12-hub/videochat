//bcrypt popular password encypting package
const User = require('./user')
const bcrypt = require('bcryptjs')
// const jwt = require('jwt-simple')
// const config = require("./config")

// const token = (user) => {
//     const timestamp = new Date().getTime()
//     return jwt.encode({
//         sub: user.id,
//         iat: timestamp
//     }, config.secret)
// }



const signup = async (req, res, next) => {

   
     const username = req.body.username;
        const password = req.body.password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    if (!username || !password) {
        return res.status(422).send({
            error: "you must provide both"
        })
    }User.findOne({
       username:username
    }, (err, existinguser) => {
        if (err) {
            return next(err)    
        }
        if (existinguser) {
            return res.status(422).send({
                error: 'username already exits click on login '
            })
        }
        const user = new User({
            username: username,
            password: hashedPassword
        }) ///create new User instance or record
        user.save(err => {
            if (err) {
                return next(err)
            }
            res.json(user)
            })
        })
        
    }
    
    

     ///save the record
  



const login=async (req,res,next)=>{
     const username = req.body.username;
    const password = req.body.password
    // if (!username || !password) {
    //     return res.status(422).send({
    //         error: "you must provide both"
    //     })
    // }
    User.findOne({username:username},async (err,existinguser)=>{
        if(err){return next(err)}
        if(existinguser){
         await bcrypt.compare(password,existinguser.password) ?res.send("hi you are logged in"):res.send("check credentials")
        }
        res.send("need to signin")

    })

}
module.exports={login,signup}
