import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { TiTick } from "react-icons/ti";
import { TfiClose } from "react-icons/tfi";
import { MdPersonAdd } from "react-icons/md";
import "./css/style.css";
const DataUseEffect = () => {
  const [data, setData] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deteteId, setDeleteId] = useState();
  const [changedStatus, setChangedStatus] = useState();
  const [changedId, setChangedId] = useState();
  const [editStatus, setEditStatus] = useState(false);
  const [edtId, setEdtId] = useState();
  const [editValue, setEditValue] = useState("");
  const [saveStatus, setSaveStatus] = useState(false);
  const [saveId, setSaveId] = useState();
  const [addStatus, setAddStatus] = useState(false);
  const [addValue, setAddValue] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const deleteUser = (id) => {
    setDeleteStatus(true);
    setDeleteId(id);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) =>
        setData(
          data.filter((value) => value.id !== id),
          setDeleteStatus(false)
        )
      );
  };
  const changeStatus = (status, id) => {
    setChangedStatus(true);
    setChangedId(id);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) =>
        setData(
          data.map((value) => (value.id === json.id ? json : value)),
          setChangedStatus(false)
        )
      );
  };
  const editToDo = (id, title) => {
    setSaveStatus(true);
    setSaveId(id);
    editStatus
      ? fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: editValue,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then(
            (json) =>
              setData(
                data.map((value) => (value.id === json.id ? json : value)),
                setSaveStatus(false)
              ),

            setEditStatus(!editStatus)
          )
      : setEditStatus(!editStatus);
    setEdtId(id);
    setEditValue(title);
  };
  const add = () => {
    addStatus
      ? addValue.length > 0
        ? fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: "POST",
            body: JSON.stringify({
              title: addValue,
              completed: false,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => setData([...data, json]), setAddStatus(false))
        : alert("Fill Input")
      : setAddStatus(true);
  };
  const close = () => setAddStatus(false);
  return (
    <div className="container">
      <h3>To Do List</h3>
      <div className="todo-section">
        {data.map(({ userId, id, title, completed }) => {
          return (
            <div key={id} className="item">
              <div
                className={`checkbox${completed}`}
                onClick={() => changeStatus(!completed, id)}>
                {changedStatus && changedId === id ? (
                  <Triangle height="25" width="25" color="#ffff" />
                ) : completed ? (
                  <TiTick className="tick" />
                ) : (
                  ""
                )}
              </div>
              <div className="todo">
                <h4>
                  {editStatus && edtId === id ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : saveStatus && saveId === id ? (
                    <Triangle height="25" width="25" color="#ffff" />
                  ) : (
                    title
                  )}
                </h4>
                <div className="actions">
                  <button className="edit" onClick={() => editToDo(id, title)}>
                    {editStatus && edtId === id ? "Save" : "Edit"}
                  </button>
                  <button className="delete" onClick={() => deleteUser(id)}>
                    {deleteStatus && id === deteteId ? (
                      <Triangle height="30" width="30" color="#dc143c" />
                    ) : (
                      "Delete "
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {addStatus ? (
        <div className="add-modal">
          <div className="add-secttion">
            <span onClick={close}>
              <TfiClose />
            </span>
            <textarea
              type="text"
              placeholder="Write your todo "
              onChange={(e) => setAddValue(e.target.value)}
            />
            <button onClick={add}>Add</button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="addBtn" onClick={add}>
        <MdPersonAdd />
      </div>
    </div>
  );
};

export default DataUseEffect;
