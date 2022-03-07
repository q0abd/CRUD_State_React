import React, { useState } from "react";
import "./style.css";

const App = () => {
  // const newStory = localStorage.getItem("localCrud");
  const [data, setData] = useState(
    // newStory
    //   ? JSON.parse(newStory)
    //   :
    [
      { id: 1, name: "Abdulloh", status: "Developer" },
      { id: 2, name: "Mirsolih", status: "Mexanik" },
      { id: 3, name: "Azimjon", status: "Meneger" },
      { id: 4, name: "Sardorbek", status: "Freelancer" },
    ]
  );
  const [editSave, setEditSave] = useState(null);
  const [change, setChange] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("");

  // LocalStorage
  // localStorage.setItem("localCrud", JSON.stringify(data));

  // Save-input
  const useSave = () => {
    if (change.length === 0) {
      alert("Malumot kiritilmadi!");
    } else {
      const newData = [
        ...data,
        {
          id: data.length + 1,
          name: change,
        },
      ];
      setData(newData);
    }
  };

  // Delete
  const getDelete = (ids) => {
    const newArr = data.filter(({ id }) => id !== ids);
    setData(newArr);
  };

  // Edit-Save
  const getEdit = ({ id, name }) => {
    setEditSave(id);
    setTitleInput(name);
  };

  // Save-Edit
  const getSaveOnEdit = () => {
    const newArraySave = data.map((value) =>
      editSave === value.id ? { ...value, name: titleInput } : value
    );
    if (newArraySave) {
      alert("Malumot ozgardi!");
    }
    setData(newArraySave);
    setEditSave(null);
  };

  // Refresh page - LocalStorage Clear
  const getReshresh = () => {
    localStorage.removeItem("localCrud");
    document.location.reload(true);
  };

  const openForBiznz = () => {
    setShow(!show);
  };

  const getSearch = (e) => {
    const newArray = data.filter((value) =>
      value[key].toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(newArray);

    if (e.target.value === "") {
      setData([
        { id: 1, name: "Abdulloh", status: "Developer" },
        { id: 2, name: "Mirsolih", status: "Mexanik" },
        { id: 3, name: "Azimjon", status: "Meneger" },
        { id: 4, name: "Sardorbek", status: "Freelancer" },
      ]);
    }
  };

  return (
    <div>
      <div className="add-user">
        <div>
          <input
            placeholder="Enter your new user"
            onChange={(e) => setChange(e.target.value)}
            type="text"
          />
          <button onClick={useSave}>Save</button>
        </div>
        {show && (
          <div className="contentSelect">
            <div className="selector">
              Sort:
              <select onChange={(e) => setKey(e.target.value)} name="" id="">
                <option value="name">by Name</option>
                <option value="status">by Status</option>
              </select>
            </div>
            <input
              onChange={getSearch}
              type="text"
              placeholder="search users"
            />
          </div>
        )}
      </div>
      <div className="conFooter">
        <button onClick={getReshresh}>Restore</button>
        <button onClick={openForBiznz}>Sort by</button>
      </div>
      <table
        border="1"
        style={{
          borderCollapse: "collapse",
          width: "50%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Assets</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, status }, index) => {
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>
                  {editSave === id ? (
                    <input
                      id="edit"
                      onChange={(e) => setTitleInput(e.target.value)}
                      style={{ color: "blue" }}
                      type="text"
                      value={titleInput}
                    />
                  ) : (
                    name
                  )}
                </td>
                <td>{status}</td>
                <td
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button onClick={() => getDelete(id)}>Delete</button>
                  {editSave === id ? (
                    <button onClick={getSaveOnEdit}>Save</button>
                  ) : (
                    <label for="edit">
                      <button onClick={() => getEdit({ id, name })}>
                        Edit
                      </button>
                    </label>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
