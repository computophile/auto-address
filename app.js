/*
By Taseen;
Auto Complete address for woocommerce form
*/
document.getElementById("billing_address_1").addEventListener('focus', initAutocompleteBilling);


let placeSearch;

let autocompleteBilling;

const componentForm = {
  street_number: "long_name",
  route: "long_name",
  locality: "long_name", // city
  administrative_area_level_1: "short_name", //state
  postal_code: "short_name",
};
const woo_billingField = {
  "billing_address_1": "",
 "billing_city": "", 
 "billing_state": "", 
 "billing_postcode": ""}


function initAutocompleteBilling() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocompleteBilling = new google.maps.places.Autocomplete(
    document.getElementById("billing_address_1"),
    { types: ["geocode"] }
  );

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocompleteBilling.setFields(["address_component"]);
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocompleteBilling.addListener("place_changed", fillInAddressBilling);

  autocompleteBilling.setComponentRestrictions({
    country: ["ca"],
  });
}



function fillInAddressBilling() {
  // Get the place details from the autocomplete object.
  const placeBilling = autocompleteBilling.getPlace();
    // console.log(place.address_components);

  for (const fieldName in woo_billingField) {
    // const fieldName = woo_billingField[index];
    woo_billingField[fieldName] = "";
    document.getElementById(fieldName).value = "";
    document.getElementById(fieldName).disabled = false;
  }

  
  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (const component of placeBilling.address_components) {
    const addressType = component.types[0];

    if (addressType == 'street_number'){
       woo_billingField['billing_address_1'] += component.long_name;
    }
    if (addressType == 'route'){
      woo_billingField['billing_address_1'] += " " + component.long_name;
   }
   if (addressType == 'locality'){
    woo_billingField['billing_city'] = component.long_name;
 }
 if (addressType == 'administrative_area_level_1'){
  woo_billingField['billing_state'] = component.short_name;
  
}
if (addressType == 'postal_code'){
  woo_billingField['billing_postcode'] = component[componentForm[addressType]];
}
}
writeTofieldBilling();
}


function writeTofieldBilling(){
    // filling the field
    for (const field in woo_billingField){
      if (document.getElementById(field).value.length > 0){
        // console.log(document.getElementById(field));
        document.getElementById(field).value = "";
      }
      document.getElementById(field).value= woo_billingField[field]; 
  
    }
}
document.getElementById("shipping_address_1").addEventListener('focus', initAutocompleteShipping);
let autocompleteShipping;
const componentForm2 = {
    street_number: "long_name",
    route: "long_name",
    locality: "long_name", // city
    administrative_area_level_1: "short_name", //state
    postal_code: "short_name",
  };

  
 const woo_ShippingField = {
    "shipping_address_1": "",
   "shipping_city": "", 
   "shipping_state": "", 
   "shipping_postcode": ""}

   function initAutocompleteShipping() {
    // console.log("Autocomplete initiated")
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocompleteShipping = new google.maps.places.Autocomplete(
    document.getElementById("shipping_address_1"),
    { types: ["geocode"] }
  );
  
  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocompleteShipping.setFields(["address_component"]);
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocompleteShipping.addListener("place_changed", fillInAddressShipping);
  
  autocompleteShipping.setComponentRestrictions({
    country: ["ca"],
  });
  }

  
function fillInAddressShipping() {
    // Get the place details from the autocomplete object.
    const placeShipping = autocompleteShipping.getPlace();
      // console.log(place.address_components);
  
    for (const fieldName in woo_ShippingField) {
      // const fieldName = woo_ShippingField[index];
      woo_ShippingField[fieldName] = "";
      document.getElementById(fieldName).value = "";
      document.getElementById(fieldName).disabled = false;
    }
  
    
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of placeShipping.address_components) {
      const addressType = component.types[0];
  
      if (addressType == 'street_number'){
         woo_ShippingField['shipping_address_1'] += component.long_name;
      }
      if (addressType == 'route'){
        woo_ShippingField['shipping_address_1'] += " " + component.long_name;
     }
     if (addressType == 'locality'){
      woo_ShippingField['shipping_city'] = component.long_name;
   }
   if (addressType == 'administrative_area_level_1'){
    woo_ShippingField['shipping_state'] = component.short_name;
    
  }
  if (addressType == 'postal_code'){
    woo_ShippingField['shipping_postcode'] = component[componentForm2[addressType]];
  }
  }
    // filling the field
    for (const field in woo_ShippingField){
      if (document.getElementById(field).value.length > 0){
        // console.log(document.getElementById(field));
        document.getElementById(field).value = "";
      }
      document.getElementById(field).value= woo_ShippingField[field]; 
  
    }
  
    writeTofieldShipping();
}


function writeTofieldShipping(){
    // filling the field
    for (const field in woo_billingField){
      if (document.getElementById(field).value.length > 0){
        // console.log(document.getElementById(field));
        document.getElementById(field).value = "";
      }
      document.getElementById(field).value= woo_billingField[field]; 
  
    }
}
