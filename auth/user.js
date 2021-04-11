const mongoose=require('mongoose')

const userscshema=new mongoose.Schema({
    username:{type:String,unique:true,lowercase:true},
    password:String
    
})
// userscshema.pre('save',async (next)=>{
//     const user=this;
//     const salt =await bcrypt.genSalt(10)
//     const hash=await bcrypt.hash(user.password,null,salt)
//     user.password=hash;
//     next();
//     // bcrypt.genSalt(10,(err,salt)=>{
//     //     if(err){return next(err)}
//     //     bcrypt.hash(user.password,salt,(err,hash)=>{
//     //         if(err){return next(err)}
//     //         user.password=hash;
//     //         next();
//     //     })
//     // })
// })

module.exports=mongoose.model('users',userscshema)
