const apiKey = 'AIzaSyBMXc0n4AYyHwYKAduPDWSeat3kJD4QZF8'; // Replace with a valid API key
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
script.onload = initializeMap;
script.onerror = () => console.error('Failed to load Google Maps script.');
document.head.appendChild(script);

// Map initialization function
function initializeMap() {
  const myLatLng = { lat: 43.0000, lng: -75.0000 };

  // Map options
  const mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  // Create map instance
  const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  // Direction service and renderer
  const directionService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  // Calculate route function
  function calcRoute() {
    const origin = document.getElementById('from').value;
    const destination = document.getElementById('to').value;

    if (!origin || !destination) {
      displayMessage('Please enter both origin and destination.', 'alert-warning');
      return;
    }

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    };

    // Make the route request
    directionService.route(request, (result, status) => {
      const output = document.getElementById('output');

      if (status === google.maps.DirectionsStatus.OK) {
        // Get the distance in meters and convert to miles
        const distanceValue = result.routes[0].legs[0].distance.value; // Distance in meters
        const distanceInMiles = distanceValue / 1609.34; // Convert to miles

        // Determine price based on distance range
        let rate;
        if (distanceInMiles <= 500) {
          rate = 0.90;
        } else if (distanceInMiles <= 1000) {
          rate = 0.83;
        } else if (distanceInMiles <= 1500) {
          rate = 0.80;
        } else if (distanceInMiles <= 2000) {
          rate = 0.58;
        } else if (distanceInMiles <= 2500) {
          rate = 0.47;
        } else if (distanceInMiles <= 3000) {
          rate = 0.45;
        } else {
          rate = 0.43;
        }

        const price = (distanceInMiles * rate).toFixed(2); // Price rounded to 2 decimal places

        // Display distance, duration, and price
        output.innerHTML = `
          <div class="alert-info">
            <strong>From:</strong> ${origin} <br>
            <strong>To:</strong> ${destination} <br>
            Driving Distance: <i class="fas fa-road"></i> ${result.routes[0].legs[0].distance.text} <br>
            Duration: <i class="fas fa-hourglass-start"></i> ${result.routes[0].legs[0].duration.text} <br>
            Price: <i class="fas fa-dollar-sign"></i> $${price}
          </div>`;

        // Set the directions on the map
        directionsDisplay.setDirections(result);
      } else {
        // Reset map and show error
        directionsDisplay.setDirections({ routes: [] });
        map.setCenter(myLatLng);
        displayMessage('Could not retrieve distance. Please try again.', 'alert-danger');
      }
    });
  }

  // Attach calcRoute to button click
  const calculateButton = document.querySelector('button');
  if (calculateButton) {
    calculateButton.addEventListener('click', calcRoute);
  } else {
    console.warn('Calculate button not found in the DOM.');
  }

  // Autocomplete for input fields
  const autocompleteOptions = { types: ['(cities)'] };
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');

  if (fromInput && toInput) {
    new google.maps.places.Autocomplete(fromInput, autocompleteOptions);
    new google.maps.places.Autocomplete(toInput, autocompleteOptions);
  } else {
    console.warn('Input fields for origin and destination not found in the DOM.');
  }
}

// Utility function to display messages
function displayMessage(message, alertClass) {
  const output = document.getElementById('output');
  if (output) {
    output.innerHTML = `<div class="${alertClass}">${message}</div>`;
  } else {
    console.warn('Output container not found in the DOM.');
  }
}
