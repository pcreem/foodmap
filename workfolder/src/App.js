
import React, { useState, useEffect } from "react";
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Button
} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import Map from "./Map";
import InfoSender from "./InfoSender";
import List from "./List";
import db from "./firebase";


function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 49.260380, lng: -123.113400 });
  // lat: 34.80746, lng: -40.4796 
  const [mapZoom, setMapZoom] = useState(11);
  const [list, setList] = useState([])

  const [{ user }, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((error) => alert(error.message));
  };

  const signOut = () => {
    dispatch({
      type: actionTypes.SIGNOUT
    })
  };

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };


  useEffect(() => {
    db
      .collection('freesource')
      .onSnapshot(snapshot => (
        setList(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
  }, [])


  return (
    <div className="app">
      <div className="app__nav">
        <h1>Find food support in your country</h1>
        <div className="app__navRight">
          {/* <FormControl className="app__navDropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Button onClick={user ? signOut : signIn}>
            {user ? 'SignOut' : 'SignIn'}
          </Button>
        </div>
      </div>


      <div className="app__info">
        <div className="app__infoLeft">
          <Map
            center={mapCenter}
            zoom={mapZoom}
            list={list}
          />
        </div>
        {user &&
          <div className="app__infoRight">
            <InfoSender />
            <List list={list} />
          </div>
        }

      </div>
      <div className="app__footer">
        <a
          href="https://github.com/pcreem"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
}

export default App;
