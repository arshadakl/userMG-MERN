const doLogin = async(req,res)=>{
    console.log(req.body);
    res.json({"data":"admin here"})

}


module.exports ={
    doLogin
}