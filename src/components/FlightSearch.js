import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import city from './cityData';

import './FlightSearch.css'

function FlightSearch() {
  const [toCity, setToCity] = useState( );
  const [forCity, setForCity] = useState();

  const [tName , setTName] = useState("");
  const [fName , setFName] = useState("");
  const [distance, setDistance] = useState("");
  const [flyTime, SetFlyTime] = useState("");
  const [flocation , setFLocation] = useState("")
  const [tlocation , setTLocation] = useState("")


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '497a75d1dcmshed919dc1576e1eep19383djsn9c9a3e7a0b54',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
    }
  };

  // fetch('https://aerodatabox.p.rapidapi.com/airports/iata/LHR/distance-time/ABZ', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

  async function fetchdata() {
    const data =await fetch(`https://aerodatabox.p.rapidapi.com/airports/iata/${forCity}/distance-time/${toCity}`, options);
    const res = await data.json();
    setTName(res.to.name)
    setFName(res.from.name)
    setDistance(res.greatCircleDistance.km)
    SetFlyTime(res.approxFlightTime)
    setFLocation({Longitude:res.from.location.lon, Latitude: res.from.location.lon})
    setTLocation({Longitude:res.to.location.lon, Latitude: res.to.location.lon})
    return res;
  }


  const handleChange = (e) => {
    setForCity(e.target.value)
  }

  const toCityselect = city.filter(item => item.code !== forCity)

  const handleChangeto = (e) => {
    setToCity(e.target.value);
  }

  useEffect(()=>{
    fetchdata();
  },[toCity])


  return (
    <div className='main'>
      <img src="image/image1.jpg" alt="" />

      <div className="flight-list">
        <div className="search">
          <div className="from">
            <label>From City</label>
            <select onChange={handleChange}>
              <option>---Select City---</option>
              {
                city.map(item => <option key={item.code} value={item.code}>{item.CityName}</option>)
              }
            </select>
          </div>
          <div className="to">
            <label>To City</label>
            <select onChange={handleChangeto} >
              <option>---Select City---</option>
              {
                toCityselect.map(item => <option key={item.code} value={item.code}>{item.CityName}</option>)
              }
            </select>
        </div>
      </div>

      <h3>From {fName} to {tName} </h3>
      <div className="flight-details">
        <section>
        <span className='fname'>{fName} City Location :</span>
        <span>
            Lon : {flocation.Longitude}
        </span>
        <span>
            Lat : {flocation.Latitude}
        </span>
        </section>
        <section>
        <span className='tname'>{tName} City Location :</span>
        <span>
            Lon :  {tlocation.Longitude}
        </span>
        <span>
            Lat :  {tlocation.Latitude}
        </span>
        </section>
        <span>Fly time : {flyTime}</span>
        <span>Distance in KM: {distance} </span>
      </div>
    </div>
    </div >
  )
}

export default FlightSearch

