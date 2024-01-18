const doLogin = async(req,res)=>{
    const {email, password} = req.body;
    console.log(email);
    res.json({email,"data":"user here"})
}


module.exports={
    doLogin
}