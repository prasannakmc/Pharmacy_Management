

fetch(`http://localhost:3000/getorder`).then(res => {
            if(res.status === 200){
                return res.json();
            }
        }).then((data)=>{
            if(data){
                const place_images_container = document.getElementById("ordertable");
                var cols = "";
                //alert(data.comments.length);

                if(data.comments.length == 0) {
                    cols += '<h3 class="text-center text-secondary" style="width:100%">No Recent Orders.</h3>';

                } else {

            cols += '<thead class="thead-light "><tr class="text-center"><th colspan="2">Order Id</th><th colspan="2">Email</th><th colspan="3">Address</th><th colspan="4">Product Id</th><th colspan="4">Quantity</th><th colspan="4">Total</th><th colspan="2">Actions</th></tr></thead><tbody>';

                for(let mm=0;mm<data.comments.length;mm++) {

                    
                        var newRow = ("<tr>");

                    cols += '<tr class="text-center"><td  colspan="1">' + data.comments[mm].id + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].userid + '</td>';
                    cols += '<td colspan="2">' + data.comments[mm].fulladdress + '</td>';
                    cols += '<td colspan="4" class="text-center">';

                    const ids = data.comments[mm].product_ids.split('#');
                    for (var i = 0; i < ids.length; i++) {
                        cols += ids[i] + '<br/>';
                    }

                    cols += '</td>';

                    cols += '<td colspan="4" class="text-center">';

                    const qty = data.comments[mm].product_quantities.split('#');
                    for (var i = 0; i < qty.length; i++) {
                        cols += qty[i] + '<br/>';
                    }

                    cols += '</td><td></td>';

                    cols += '<td colspan="4" style="width:73.5px">' + data.comments[mm].total + '</td>';

                    cols += '<td colspan="2" class="text-center"><form method="POST" action="cancelorder"><button type="submit" name="id" style="color:red;background-color:transparent;border:none;" value="' + data.comments[mm].id + '">Cancel</button></form></td></tr>';
                    //alert(cols);

                }
            }

                place_images_container.innerHTML =cols;

            } 
        });