const User = require("../Models/Users");
const flash=require("connect-flash");
 
exports.postSignUp = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if(username !== "" && email !== "" && password !== ""){
        User.findOne({where:{email:email}}).then((user) => {
            if(user){
                console.log("user not valid");
                res.status(208).send("<script>alert('Account already exists.');window.location.href='/login';</script>");
            }else{
                User.create({
                    username: username,
                    password: password,
                    email:email,
                }).then(() => {
                    res.status(200).send("<script>alert('Signup Successfull.');window.location.href='/login';</script>");
                }).catch((err) => {
                    console.log(err.message);
                    res.status(500).send("<script>alert('Oops !, Something Went Wrong.');window.location.href='/signup';</script>");
                })
            }
        })
    }else{
        console.log("empty values found");
        res.status(500).send("<script>alert('Empty Values Found.');window.location.href='/signup';</script>");
    }

};


exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    if(email !== "" && password !== ""){

    User.findOne({where:{email:email,password:password}}).then((user) => {
        if(user){
            req.session.loggedin = true;
            req.session.email = user.email;
            res.status(200).send("<script>alert('Login Successfull.');window.location.href='/';</script>");

        }else{
            req.session.loggedin = false;
            console.log("Incorrect Details");
            res.status(500).send("<script>alert('Incorrect Credentials.');window.location.href='/login';</script>");
        }
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Oops !, Something Went Wrong.');window.location.href='/login';</script>");
    })

    }else{
        req.session.loggedin = false;
        //res.status(500).json({message: "Empty values found !"});
        res.status(500).send("<script>alert('Empty values found.');window.location.href='/login';</script>");
    }

};

var useremail = '';

exports.checkUser = (req, res, next) => {

    const email = req.body.email;

    User.findOne({where:{email:email}}).then((user) => {
        if(user){
            useremail = email;

            console.log(useremail);
            res.redirect("/updatepass");

        } else {
            res.status(500);
            res.redirect("/forgotpass");
        }
    });

}

exports.updatepassword = (req, res, next) => {

    const passwd = req.body.npass;

    User.update({
        password: passwd
    }, {
        where: {email: useremail}
    }).then(comments => {

        res.status(200).send("<script>alert('Updated Successfully.');window.location.href = '/login';</script>");
      }).catch((err) => {

            console.log(err.msg);
            res.status(500).send("<script>alert('Update Failed!.');window.location.href = '/forgotpass';</script>");
      });

}

exports.postLogout = (req,res,next) => {

    /*User.findOne({where:{email:req.session.email}}).then(user => {
    if(user){
        user.update({login:false},{where:{email:req.session.email}});
        return user.save();
    }
    return
    });  */  
    req.session.loggedin = false;
    req.session.email = null;
    res.status(200).send("<script>alert('Logged Out.');window.location.href='/';</script>");
};


exports.isloggedin = (req,res) => {
    
    if(req.session.loggedin) {
        res.status(200).send({
            message: true
        });
    } else {
        res.status(200).send({
            message: false
        });
    }
    

};
