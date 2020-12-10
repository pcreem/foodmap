import React, { useState } from 'react'
import './InfoSender.css'
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";

function InfoSender() {
  const [{ user }, dispatch] = useStateValue();
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [latlong, setLatlong] = useState("")
  const [openhours, setOpenhours] = useState("")
  const [restrict, setRestrict] = useState("")
  const [contact, setContact] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    let lat = 0
    let long = 0

    if (latlong) {
      lat = parseFloat(latlong.split(",")[0])
      long = parseFloat(latlong.split(",")[1])
    }

    if (name && address && latlong && openhours && contact) {
      db.collection('freesource').add({
        user: user.uid,
        name,
        address,
        lat,
        long,
        openhours,
        restrict,
        contact,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }

    setName("")
    setAddress("")
    setLatlong("")
    setOpenhours("")
    setRestrict("")
    setContact("")
  };


  return (
    <div className="infoSender">
      <form className="infoSender__form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          required
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
          required
        />
        <input
          value={latlong}
          onChange={(e) => setLatlong(e.target.value)}
          placeholder="lat, long"
          required
        />
        <input
          value={openhours}
          onChange={(e) => setOpenhours(e.target.value)}
          placeholder="openhours"
          required
        />
        <input
          value={restrict}
          onChange={(e) => setRestrict(e.target.value)}
          placeholder="requirement"
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="contact info"
          required
        />

        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default InfoSender
