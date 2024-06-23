import './storage'
import { storage } from './storage';

const storagesGeo = {
    str1: [55.655498, 37.926943],
    str2: [55.773768, 37.884893],
    str3: [55.683706, 37.332357]
}

function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula 
    let dlon = lon2 - lon1; 
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956 
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);
}


function renderStorage() {
    let mainNode = document.querySelector('section[name="main"]')
    let storNode = document.querySelector('section[name="storage"]')
    mainNode.hidden = true
    storNode.hidden = false
}

function renderMain() {
    let mainNode = document.querySelector('section[name="main"]')
    let storNode = document.querySelector('section[name="storage"]')
    storNode.hidden = true
    mainNode.hidden = false
}

if ("geolocation" in navigator) {
    // Prompt user for permission to access their location
    navigator.geolocation.getCurrentPosition(
      // Success callback function
      (position) => {
        // Get the user's latitude and longitude coordinates
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
  
        // Do something with the location data, e.g. display on a map
        let dist1 = distance(lat, storagesGeo.str1[0], lng, storagesGeo.str1[1]).toFixed(1)
        let dist2 = distance(lat, storagesGeo.str2[0], lng, storagesGeo.str2[1]).toFixed(1)
        let dist3 = distance(lat, storagesGeo.str3[0], lng, storagesGeo.str3[1]).toFixed(1)

        let str1Node = document.querySelector('p[name="str-1"]')
        str1Node.innerHTML = `${dist1} км от Вас`
        let str2Node = document.querySelector('p[name="str-2"]')
        str2Node.innerHTML = `${dist2} км от Вас`
        let str3Node = document.querySelector('p[name="str-3"]')
        str3Node.innerHTML = `${dist3} км от Вас`
      },
      // Error callback function
      (error) => {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }
    );
  } else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }

window.renderStorage = renderStorage
window.renderMain = renderMain