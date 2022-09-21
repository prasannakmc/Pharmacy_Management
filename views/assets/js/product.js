fetch(`http://localhost:3000/getproduct`).then(res => {
    if(res.status === 200){
        return res.json();
    }
}).then((data)=>{
    if(data){

        const pimage = document.getElementById("pimage");
        const pname = document.getElementById("pname");
        const pdesc = document.getElementById("pdesc");
        const pprice = document.getElementById("pprice");
        const cartb = document.getElementById("addToCart");

        pimage.src = "./uploads/"+data.comments.product_image;
        
        pname.innerHTML = data.comments.product_name;

        pdesc.innerHTML = data.comments.product_desc;

        pprice.innerHTML = data.comments.price;

        cartb.setAttribute("onclick", "addToCart("+data.comments.id+")");

    }
});
