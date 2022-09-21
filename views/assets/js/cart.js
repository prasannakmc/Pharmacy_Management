var subtotal = 0;

fetch(`http://localhost:3000/getcartitems`).then(res => {
    if(res.status === 200){
        return res.json();
    }
}).then((data)=>{
    if(data){
        const i=0;
        const place_images_container = document.getElementById("carttable");
        var cols = "";
        //alert(data.comments.length);

        if(data.comments.length == 0) {
            cols += '<h3 class="text-center text-secondary" style="width:100%">Your Cart is Empty</h3>';
        } else {

            cols += '<thead class="thead-light"><tr><th colspan="2">Product Detail</th><th>Quantity</th><th>Price (C$)</th><th>Total</th><th colspan="4">Actions</th><th colspan="4"></th></tr></thead><tbody>';

            for(let mm=0;mm<data.comments.length;mm++) {

                subtotal += parseInt(data.comments[mm].price);

                //alert(data.comments[mm].product_desc);
                    var newRow = ("<tr>");

                cols += '<tr><input type="hidden" id="id'+data.comments[mm].id+'" value="'+data.comments[mm].product_name+'"><td width="150px"><img src="./uploads/' + data.comments[mm].product_image + '" width="100%"></td>';
                cols += '<td><span>' + data.comments[mm].product_name +'</span>';
                cols += '<p>'+data.comments[mm].product_desc+'</p></td>';
                cols += '<td><input id="quantity'+data.comments[mm].id+'" type="number" min="1" onchange="calculate('+data.comments[mm].id+')" value="1"></td>';
                cols += '<td><input style="border:none;text-align:center;width:50%" type="text" readonly id="price'+data.comments[mm].id+'" value="'+data.comments[mm].price+'"></td>';
                cols += '<td><input style="border:none;text-align:center;width:50%" type="text" readonly id="amount'+data.comments[mm].id+'" value="'+data.comments[mm].price+'"></td>';
                cols += '<td colspan="20" class="text-center"><form method="POST" action="/removefromcart"><button type="submit" name="id" value="'+data.comments[mm].id+'" style="border:none;color:red;background-color:transparent;">&#10006; </button></form></td></tr> '

            }
        }

        place_images_container.innerHTML =cols;
         $("#subtotal").val(subtotal);
         if(subtotal==0) {
                $("#tax").val(0);
                $("#total").val(0);
            } else {
                $("#tax").val(15);
                $("#total").val(subtotal+15);
            }


    }
});


function checkout() {

    //alert("check");
    var id = '';
    var quantity = '';
    $.each( $("input[id^='id']"), function () {
      id+=$(this).val();
      id+='#';
    });
    $.each( $("input[id^='quantity']"), function () {
      quantity+=$(this).val();
      quantity+='#';
    });
    var total = $("#total").val();
    const d = new Date();
  d.setTime(d.getTime() + (1*5*60*1000));
  let expires = "expires="+ d.toUTCString();
    document.cookie = "total="+total+";"+expires+";path=/";
    //alert(id);
    //alert(quantity);
    //alert(total);

    const checking = fetch(`http://localhost:3000/checking`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({uids: id, quantity: quantity, total: total})

    }).then(res => {
        return res.json();
    }).then((data)=>{
        
    });
    if(parseInt(total) > 0) {
        window.location = '/checkout';
    } else {
        alert("Your Cart is Empty !");
    }

    
    
}


var total;  
function calculate(i){

//alert(i);
  total = 0;
  var price = $("#price"+i).val();
  var quantity = $("#quantity"+i).val();
  if(quantity !=""){
  var netamount= quantity*price;
  $("#amount"+i).val(netamount);
  }
  updateTotal();

}

function updateTotal() {
    //alert(1);
  total=0;
  $.each( $("input[id^='amount']"), function () {
      total+=parseInt($(this).val());
    });

   $("#subtotal").val(total);
   if(total===0) {
        $("#tax").val(0);
        $("#total").val(0);
    } else {
        $("#tax").val(15);
        $("#total").val(parseInt(total)+15);
    }

}

function removefromcart(id) {

const carted = fetch(`http://localhost:3000/removefromcart`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({id: id})

    });

window.location = '/cart';
}