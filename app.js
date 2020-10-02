// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let placeSearch;
let autocomplete;
const componentForm = {
  street_number: "long_name",
  route: "long_name",
  locality: "long_name", // city
  administrative_area_level_1: "short_name", //state
  postal_code: "short_name",
};

function initAutocomplete() {
    console.log("Autocomplete initiated")
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    { types: ["geocode"] }
  );
  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);

  autocomplete.setComponentRestrictions({
    country: ["ca"],
  });
}
const woo_addrefield = {
  "billing_address_1": "",
 "billing_city": "", 
 "billing_state": "", 
 "billing_postcode": ""}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
    console.log(place.address_components);

  for (const fieldName in woo_addrefield) {
    // const fieldName = woo_addrefield[index];
    console.log("compnents in compnents form", fieldName);

    document.getElementById(fieldName).value = "";
    document.getElementById(fieldName).disabled = false;
  }

  
  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (const component of place.address_components) {
    const addressType = component.types[0];

    if (addressType == 'street_number'){
       woo_addrefield['billing_address_1'] += component.long_name;
    }
    if (addressType == 'route'){
      woo_addrefield['billing_address_1'] += " " + component.long_name;
   }
   if (addressType == 'locality'){
    woo_addrefield['billing_city'] += component.long_name;
 }
 if (addressType == 'administrative_area_level_1'){
  woo_addrefield['billing_state'] += component.short_name;
}
if (addressType == 'postal_code'){
  woo_addrefield['billing_postcode'] += component[componentForm[addressType]];
}
  //   console.log("Component of Place.address_components", component.types[0]);

  //   console.log("AddressType", addressType);
  //   if (componentForm[addressType]) {
  //     const val = component[componentForm[addressType]];
  //     document.getElementById(addressType).value = val;
  //   }
  // }
}
  // filling the field
  for (const field in woo_addrefield){
    if (document.getElementById(field).value == ""){
      console.log(document.getElementById(field));
      document.getElementById(field).value= woo_addrefield[field]; 
    }
  }

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
// function geolocate() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       };
//       const circle = new google.maps.Circle({
//         center: geolocation,
//         radius: position.coords.accuracy,
//       });
//       autocomplete.setBounds(circle.getBounds());
//     });
//   }
// }

// window.onload(initAutocomplete);