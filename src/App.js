import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import "./App.css";
import List from "./List";
// const getLocalStorage = () => {
//   let list = localStorage.getItem("list");
//   if (list) {
//     return (list = JSON.parse(localStorage.getItem("list")));
//   } else {
//     return [];
//   }
// };

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter item name");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(true);
      setIsEditing(false);
      showAlert(true, "success", "Items are edited");
    } else {
      showAlert(true, "success", "Item is added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      console.log(newItem);
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Items are cleared");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item is removed from the list");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list",JSON.stringify(list))
  },[list])


  return (
    <section className="section">
      <div className="container">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className="title">Grocery Bud</div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. eggs"
              type="text"
            />
            <button className="submit">Submit</button>
          </form>
        </div>
        <div className="grocery-container">
          <List items={list} editItem={editItem} removeItem={removeItem} />
        </div>
        <button className="clear-btn" onClick={clearList}>
          Clear items
        </button>
      </div>
    </section>
  );
}

export default App;

// if (!name) {
//     showAlert(true, "danger", "Add item to your list")
//   } else if (name && isEditing) {
//     setList(
//       list.map((item) => {
//         if (item.id === editID) {
//           return { ...item, title: name };
//         }
//         return item;
//       })
//     );
//     setName("");
//     setEditID(null);
//     setIsEditing(false);
//     showAlert(true, "success", "value changed");

//   } else {
//     showAlert(true, "success", "item added to the list");
//     const newItem = { id: new Date().getTime().toString(), title: name };

//     setList([...list, newItem]);
//     setName("");
//   }
// };

// const showAlert = (show = false, type = "", msg = "") => {
//   setAlert({ show, type, msg });
// };

// const clearList = () => {
//   showAlert(true, "danger", "empty list");
//   setList([]);
// };
// const removeItem = (id) => {
//   showAlert(true, "danger", "item removed");

//   setList(list.filter((item) => item.id !== id));
// };
// const editItem = (id) => {
//   const specificItem = list.find((item) => item.id === id);
//   setIsEditing(true);
//   setEditID(id);
//   setName(specificItem.title);
// };

// useEffect(() => {
//   localStorage.setItem("list", JSON.stringify(list));
// }, [list]);
