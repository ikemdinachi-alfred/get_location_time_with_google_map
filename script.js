API_KEY ="AIzaSyCUh_cxArNdSRXpma762LaH4Uh94Jhw9Uk"

// Set Map Options
const myLatLng = { lat: 38.3460, lng: -0.4907 };
const mapOptions = {
  center: myLatLng,
  zoom: 7,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

// Create map
const map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

// Create Direction Service object
const directionService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the directionRenderer to the map
directionsDisplay.setMap(map);

// Function to calculate route
function calcRoute() {
  const request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  directionService.route(request, (result, status) => {
    const output = document.getElementById("output");

    if (status === google.maps.DirectionsStatus.OK) {
      // Display distance and time
      output.innerHTML = `
        <div class="alert-info">
          <strong>From:</strong> ${document.getElementById("from").value} <br>
          <strong>To:</strong> ${document.getElementById("to").value} <br>
          Driving Distance: <i class="fas fa-road"></i> ${result.routes[0].legs[0].distance.text} <br>
          Duration: <i class="fas fa-hourglass-start"></i> ${result.routes[0].legs[0].duration.text}
        </div>`;
      directionsDisplay.setDirections(result);
    } else {
      directionsDisplay.setDirections({ routes: [] });
      map.setCenter(myLatLng);
      output.innerHTML = `
        <div class="alert-danger">
          <i class="fas fa-exclamation-triangle"></i> Could not retrieve distance.
        </div>`;
    }
  });
}

// Create autocomplete objects for inputs
const options = { types: ["(cities)"] };
const input1 = document.getElementById("from");
const autocomplete1 = new google.maps.places.Autocomplete(input1, options);

const input2 = document.getElementById("to");
const autocomplete2 = new google.maps.places.Autocomplete(input2, options);

// // Set Map Options

// var myLatLng ={lat: 38.3460, lng: -0.4907}
// var mapOptions ={
//   center: myLatLng,
//   zoom: 7,
//   mapTypeId: google.maps.MapTypeId.ROADMAP
// }



// // create map

// var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions)

// // Create a Direction Service object to use the route method and get result

// var directionService = new google.maps.DirectionService();

// // create direction renderer object which will be used to display the route

// var directionsDisplay = new google.maps.DirectionRenderer();

// //bind the directionRenderer to the map

// directionsDisplay.setMap(map)


// function calcRoute(){
// // Create route
// var request = {
//   origin: document.getElementById("from").value,
//   destination: document.getElementById("to").value,
//   travelMode: google.maps.TravelMode.DRIVING, // WALKING, TRANSIT
//   unitSystem: google.maps.UnitsSystem.IMPERIAL
// }
// // pas the request to the route method
// directionService.route(request, (result, status)=>{
// if(status==google.maps.DirectionStatus.OK){
//   // get distance and time
//   const output = document.querySelector('#output');
//   output.innerHTML = "<div class="alert-info"> "+ document.getElementById("from").value + " <br />To: " +
//    document.getElementById("to").value + ". <br />  Driving distance  '<i class=fas fa-road'> </i>: " +
//    result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : "+ result.routes[0].legs[0].duration.text + ". </div> "

//    // display route
//   directionsDisplay.setDirections(result);
// } else{
//   directionsDisplay.setDirections({routes: []})
// }
// // center map in spain

// map.setCenter(myLatLng);

// //  show error message:
// output.innerHTML = "<div class='alert-danger'> <i class='fas fa-exclamation-triangle'> </i> could not retrieve distance . </div>";
// });
// }






// // create autocomplete object for all input

// var Options = {
//   types: ['(cities)']
// }
// var input1 = document.getElementById("from")
// var autocomplete1 = new google.maps.places.Autocomplete(input1,Options)

// var input2 = document.getElementById("to")
// var autocomplete2 = new google.maps.places.Autocomplete(input2,Options)


