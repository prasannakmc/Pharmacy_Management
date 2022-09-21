
fetch(`http://localhost:3000/getmedications`).then(res => {
    if(res.status === 200){
        return res.json();
    }
}).then((data)=>{
    if(data){
        const i=0;
        const place_images_container = document.getElementById("place_medication");
        var cols = "";
        //alert(data.comments.length);

        for(let mm=0;mm<data.comments.length;mm++) {

            //alert(data.comments[mm].product_desc);
                var newRow = ("<div>");

            cols += '<div class="col-md-6 col-lg-3 col-12"><div class="card"><div class="card_img"><img  style="height:179px;" class="card-img-top" src="./uploads/' + data.comments[mm].product_image + '" alt="Card image cap"></div>';

            cols += '<div class="card-body"><div class="card_header"><h5> <button style="border:none;background-color:transparent;color:blue" onclick="product('+data.comments[mm].id+')">' + data.comments[mm].product_name +'</button></h5></div>';

            cols += '<div class="card-footer"><p>'+data.comments[mm].product_desc+'</p>';

            cols += '<p><div class="add_to_cart"><button onclick="addToCart('+data.comments[mm].id+');">Add To Cart</button></div><span>'+data.comments[mm].price+'</span> C$</p>';

            cols += '</div></div></div></div>';

        }

        place_images_container.innerHTML =cols;

    }
});




function product(id) {

    const prod = fetch(`http://localhost:3000/openproduct`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({id: id})

    });

    window.location = '/product';

}