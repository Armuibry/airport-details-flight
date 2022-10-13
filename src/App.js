import React from "react"
import FlightSearch from "./components/FlightSearch";
import axios from 'axios'


function App() {

  // const [flightDetails , setFlightDetails] = useState("")


  const options = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/flights/number/KL1395/2022-09-22',
    headers: {
      'X-RapidAPI-Key': '540f0b839amsh326a3d4d7e3e3d8p106832jsna3163a02b20d',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
 


  
  




  return (
    <div className="App">
     <FlightSearch />
    </div>
  );
}

export default App;

