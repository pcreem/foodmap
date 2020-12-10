import React, { useState, useEffect } from 'react'
import './List.css'
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function List({ list }) {
  const [{ user }, dispatch] = useStateValue();
  const deleteItem = (id) => {
    db.collection("freesource").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  return (
    <div className="list">
      {list?.map(item => (user && user.uid === item.data.user &&
        <tr >
          <td>{item.data.name}</td>
          <td>
            {item.id ? <strong key={item.id} onClick={() => {
              deleteItem(item.id);
            }}>X</strong> : null}

          </td>
        </tr>

      ))
      }
    </div >
  )
}

export default List
