const log = document.getElementById("log");
const logged = fetch(`http://localhost:3000/isloggedin`).then(res => {
    if(res.status === 200){
        return res.json();
    }
}).then((data)=>{
    if(data){

        // alert(data.message);
        if (data.message) {
            log.innerHTML = '<a id="logout" class="nav-link" href="/logout"><span class="mobile-hide">Logout</span> <i class="far fa-user"></i></a>';

        } else {
            
            log.innerHTML = '<a id="login" class="nav-link" href="/login"><span class="mobile-hide">Login</span> <i class="far fa-user"></i></a>';    
        }
    }
});

var input = document.getElementById("search");

input.addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {

    getProducts(this.value);

  }
});

function getProducts(val) {

    //var val = document.getElementById("search").value;

fetch(`http://localhost:3000/searchProducts`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({name: val})

    });

 window.location = '/search';

}


function addToCart(id){

const carted = fetch(`http://localhost:3000/addtocart`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({id: id})

    }).then(res => {
        return res.json();
    }).then((data)=>{
        alert(data.message);
    });

}


function subscribe() {

    var subname =$("#subname").val();
    var subemail =$("#subemail").val();
    var submessage =$("#submessage").val();

    const carted = fetch(`http://localhost:3000/subscribe`, 
    {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({subname : subname, subemail:subemail,submessage:submessage})

    }).then(res => {
        return res.json();
    }).then((data)=>{
        alert(data.message);
        window.location.href = "/";
    });

}