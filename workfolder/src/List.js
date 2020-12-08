import React, { useState, useEffect } from 'react'
import './List.css'
import db from "./firebase";

function List() {
  const [list, setList] = useState([])

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

  const deleteItem = (id) => {
    console.log(id)

    db.collection("freesource").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  return (
    <div className="list">
      {list?.map(item => (
        <tr >
          <td>{item.id}</td>
          <td>
            {item.id ? <button key={item.id} onClick={() => {
              deleteItem(item.id);
            }}>X</button> : null}

          </td>
        </tr>
      ))
      }
    </div >
  )
}

export default List
