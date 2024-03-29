var myLatLng = { lat: 13.0827, lng: 80.2707 };
var mapOptions = {
    center: myLatLng,
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Hide result box
//document.getElementById("output").style.display = "none";
document.getElementById("output1").style.display = "block";
// Create/Init map
var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);
var sedano;
var sedanr;
var suvo; 
var suvr;

// Define calcRoute function
function calcRoute() {
     var y = document.getElementById("ma");
        y.style.display = "block";

    //create request
    var request = {
        origin: document.getElementById("location-1").value,
        destination: document.getElementById("location-2").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    // Routing
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time            
            var d=result.routes[0].legs[0].distance.value/1000;
            
            var n = d.toFixed(0);
            /*sedano=((n*13)+350)+" - "+((n*13)+300);
            sedanr=2*((n*11)+350)+" - "+2*((n*11)+300);
            suvo=((n*18)+350)+" - "+((n*18)+300);
            suvr=2*((n*15)+350)+" - "+2*((n*15)+300);
            traveller=(2*((n*20)+350))+" - "+(2*((n*20)+300));*/
         
         var n1=0;
            var n2=0;
           if(n<130)
            {n1=130;
            n2=125;
            }
            else if(n<250)
            {   n1=n;
                n2=125;}
            else{
                n1=n;
                n2=n;
            }
            console.log(n);
            sedano=((n1*13)+350)+" - "+((n1*13)+300);
            sedanr=2*((n2*11)+350)+" - "+2*((n2*11)+300);
            suvo=((n1*18)+350)+" - "+((n1*18)+300);
            suvr=2*((n2*16)+350)+" - "+2*((n2*16)+300);
            traveller=(2*((n2*21)+350))+" - "+(2*((n2*21)+300));
           
          //  $("#output").html("<div class='result-table'> Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />SUV Rate: ₹" +((n)*12)+"-"+((n)*15)+".<br />Sedan Rate: ₹" +((n)*8)+"-"+((n)*11)+".<br />Hatchback Rate: ₹" +((n)*16)+"-"+((n)*19)+ ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>");
            //document.getElementById("output").style.display = "block";
            $("#output1").html("<div class='meta-item;'>  <span> Distance: " + result.routes[0].legs[0].distance.text + "</span><br /><span> One Way (Min 130Km) : ₹" +sedano+"</span><br /><span> Round Way (Min 250Km) : ₹" +sedanr+"</span></div>");
            document.getElementById("output1").style.display = "block";
            $("#output2").html("<div class='meta-item;'>  <span> Distance: " + result.routes[0].legs[0].distance.text + "</span><br /><span> One Way (Min 130Km) : ₹" +suvo+"</span><br /><span> Round Way (Min 250Km) : ₹" +suvr+"</span></div>");
            document.getElementById("output1").style.display = "block";
            $("#output3").html("<div class='meta-item;'>  <span> Distance: " + result.routes[0].legs[0].distance.text + "</span><br /><span> Round Way (Min 250Km): ₹" +traveller+"</span><br /><span> One Way (Min 250Km) : Not available </span></div>");
            document.getElementById("output1").style.display = "block";
            //display route <span> Price  :  ₹13 / Km.</span>
            directionsDisplay.setDirections(result);
            



        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //Show error message           
           
            alert("Can't find road! Please try again!");
            clearRoute();
        }
    });

}

// Clear results

function clearRoute(){
    document.getElementById("output").style.display = "none";
    document.getElementById("location-1").value = "";
    document.getElementById("location-2").value = "";
    directionsDisplay.setDirections({ routes: [] });
    
}

// Create autocomplete objects for all inputs

var options = {
    componentRestrictions: { country: "ind" }
}


var input1 = document.getElementById("location-1");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options); 

var input2 = document.getElementById("location-2");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
