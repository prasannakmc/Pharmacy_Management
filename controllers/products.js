const product=require("../Models/Product");
const user = require("../Models/Users");
const subscribe = require("../Models/Subscribe");
const cart = require("../Models/Cart");
const order = require("../Models/Order");
const flash=require("connect-flash");
const Sequelize = require("sequelize"); 
const bodyParser = require("body-parser");
const path = require('path');
const op = Sequelize.Op;
const fs=require("fs");


exports.addtocart = (req,res,next) => {
    const product_id = req.body.id;

    if(req.session.loggedin) {

        if(product_id !== "" && req.session.email !== ""){
            cart.findOne({where:{productid:product_id,email:req.session.email}}).then((user) => {
                if(user){
                    console.log("Product Already Exists.");
                    res.status(500).json({
                        message: "Product Already Exists.",
                    });
                }else{
                    cart.create({
                        email: req.session.email,
                        productid:product_id
                    }).then(() => {
                        console.log("Product Added to Cart.");
                        res.status(200).json({
                            message: "Product Added to Cart.",
                        });
                    }).catch((err) => {
                        console.log(err.message);
                        res.status(500).json({
                            message: err.message,
                        });
                    })
                }
            })
        }else{
            console.log("Operation failed!");
            res.status(500).json({
                message: "Operation failed!",
            });
        }

    } else {
        console.log("Please Login!");
        res.status(500).json({
                message: "Please Login!",
            });
    }

};



exports.subscribe = (req,res,next) => {
    const subname = req.body.subname;
    const subemail = req.body.subemail;
    const submessage = req.body.submessage;


    if(subname !== "" && subemail !== "" && submessage !== "" ){
        subscribe.findOne({where:{email:subemail}}).then((user) => {
            if(user){
                console.log("Already Subscribed.");
                res.status(500).json({
                    message: "Already Subscribed.",
                });
            }else{
                subscribe.create({
                    name: subname,
                    email:subemail,
                    message: submessage
                }).then(() => {
                    console.log("Subscribed.");
                    res.status(200).json({
                        message: "Subscribed.",
                    });
                }).catch((err) => {
                    console.log(err.message);
                    res.status(500).json({
                        message: err.message,
                    });
                })
            }
        })
    } else{
        console.log("Operation failed!");
        res.status(500).json({
            message: "Operation failed!",
        });
    }

};

exports.gethomeproducts = (req,res) => {

    product.findAll().then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

pid = '';

exports.openproduct = (req, res) => {

    pid = req.body.id;
    console.log(pid);

}

exports.getproduct = (req, res) => {

    product.findOne({where: {id: pid}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });

}

pname = '';

exports.searchProducts = (req, res) => {

    pname = req.body.name;
    console.log(pname);

}

exports.getsearch = (req, res) => {

    console.log('searched');

    product.findAll({where: {product_name: {
        [op.like]: '%'+pname+'%'
    }}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });

}


exports.getorders = (req,res) => {
    order.findAll().then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

exports.getorder = (req,res) => {
    order.findAll({where: {userid: req.session.email}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

exports.getmedications = (req,res) => {

    product.findAll({where:{category:'Medication'}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

exports.getallergies = (req,res) => {

    product.findAll({where:{category:"Allergies"}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({ 
            message: "retriving failed!!!",
            comments: []
        });
    });
};


exports.getcosmetics = (req,res) => {

    product.findAll({where:{category:"Cosmetics"}}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};


exports.getcartitems = (req,res) => {

    product.findAll({where:{id: [ Sequelize.literal(
                ' SELECT productid FROM carts WHERE email ="'+req.session.email+'"')]
    }}).then(comments => {
        console.log(comments.length);
        res.status(200).json({
            message: "retrieved successfully",
            comments: comments
        });
    }).catch((err) => {
        console.log(err.msg)
        res.status(500).json({
            message: "retriving failed!!!",
            comments: []
        });
    });
};

var uid = '';
var quantity = '';
var total = '';

exports.checking = (req, res) => {

    uid = req.body.uids;
    quantity = req.body.quantity;
    total = req.body.total;
    console.log(uid);
    console.log(quantity);
    console.log(total);
}

exports.checkout = (req, res, next) => {

    const userid = req.session.email;
    const address = req.body.fulladdress;
    console.log(address);

    var status = 'Success';
    
    if(status !== "failed") {

    if(userid !== "" && address !== ""){

        order.create({
            userid: userid,
            product_ids: uid,
            product_quantities: quantity,
            total: total,
            fulladdress: address,
            status: status
        }).then(() => {
            cart.destroy({where: {email: req.session.email}}).then(() => {
                    res.status(200).send("<script>alert('Order Successful');window.location.href='/success';</script>");      }).catch((err) => {
            console.log(err.message);
            res.status(500).send("<script>alert('Order Failed!');window.location.href='/failed';</script>");
        })
            
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send("<script>alert('Order Failed!');window.location.href='/failed';</script>");
        })
    }else{
        res.status(500).send("<script>alert('Address Empty.');window.location.href='/cart';</script>");
    }
} else {
    res.status(500).send("<script>alert('Payment Failed !');window.location.href='/paymentfailed';</script>");
}

}

exports.removefromcart = (req, res, next) => {
    const id = req.body.id;

    cart.destroy({where: {email: req.session.email, productid: id}}).then(() => {
        res.status(200).send("<script>alert('Product Removed from Cart.');window.location.href='/cart';</script>");
             }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Product Not Removed from Cart.');window.location.href='/cart';</script>");

    });
}

exports.cancelorder = (req, res, next) => {
    const id = req.body.id;

    order.destroy({where: {userid: req.session.email, id: id}}).then(() => {
        res.status(200).send("<script>alert('Order Cancelled.');window.location.href='/orders';</script>");
             }).catch((err) => {
        console.log(err.message);
        res.status(500).send("<script>alert('Order Not Cancelled.');window.location.href='/orders';</script>");
    })
}