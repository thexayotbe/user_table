import React, { useReducer } from "react";
import { dataMoc } from "./data";
import "./css/style.css";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { BiHide, BiShowAlt, BiFilterAlt } from "react-icons/bi";
const reducer = (state, action) => {
  switch (action.type) {
    case "delete":
      return { data: state.data.filter(({ id }) => id !== action.payload.id) };
    case "edit":
      return {
        ...state,
        editStatus: true,
        editedValues: { ...action.payload },
      };
    case "changeValue":
      return {
        ...state,
        editedValues: {
          ...state.editedValues,
          [action.payload.name]: action.payload.value,
        },
      };
    case "addCancel":
      return {
        ...state,
        addStatus: false,
        addValues: {
          name: "",
          surname: "",
          email: "",
          password: "",
          gender: "",
        },
      };
    case "save":
      return {
        ...state,
        editStatus: false,
        data: state.data.map((value) =>
          value.id === state.editedValues.id ? state.editedValues : value
        ),
        editedValues: {},
      };
    case "adduser":
      return {
        ...state,
        addStatus: true,
      };

    case "addNewUserData":
      return {
        ...state,
        addValues: {
          ...state.addValues,
          [action.payload.name]: action.payload.value,
          id: state.data.length + 1,
        },
      };
    case "saveNewUser":
      return {
        ...state,
        data: [...state.data, state.addValues],
        addStatus: false,
      };
    case "close-modal":
      return {
        ...state,
        editStatus: false,
        editedValues: {},
      };
    case "passwordShow":
      return {
        ...state,
        showPassword: !state.showPassword,
        passwordId: action.payload,
      };
    case "searchDataGet":
      return {
        ...state,
        dataCopy: [...state.data],
      };
    case "search":
      return {
        ...state,
        data: state.dataCopy.filter((value) => {
          return (
            value.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            value.surname
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            value.email.toLowerCase().includes(action.payload.toLowerCase())
          );
        }),
      };
    case "filterOpen":
      return {
        ...state,
        filterStatus: !state.filterStatus,
      };
    case "changeSearchName":
      return {
        ...state,
        dataCopy: [...state.data],
        searchByName: action.payload,
      };
    case "searchByColumn":
      return {
        ...state,
        data: state.dataCopy.filter((value) => {
          return value[state.selectedOption]
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    case "openSelecter":
      return {
        ...state,
        optionStatus: true,
        dataCopy: [...state.data],
      };
    case "selectOption":
      return {
        ...state,
        dataCopy: [...state.data],
        optionStatus: false,
        selectedOption: action.payload.value,
      };
    case "deleteConfirm":
      return {
        ...state,
        deleteConfirmation: true,
        deleteId: action.payload.id,
      };
    case "deleteCancel":
      return {
        ...state,
        deleteConfirmation: false,
        deleteId: "",
      };
    default:
      return state;
  }
};
export const TableReducer = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: dataMoc,
    editStatus: false,
    editedValues: {},
    addStatus: false,
    addValues: { name: "", surname: "", email: "", password: "", gender: "" },
    showPassword: false,
    passwordId: "",
    dataCopy: [],
    filterStatus: false,
    selectedOption: "name",
    optionStatus: false,
    deleteConfirmation: false,
  });
  return (
    <div className="table-container">
      <div className="header">
        <h3>
          Number of users : <span>{state.data.length}</span>
        </h3>
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            className="search"
            onClick={() => dispatch({ type: "searchDataGet" })}
            onChange={(e) =>
              dispatch({ type: "search", payload: e.target.value })
            }
          />
          <button onClick={() => dispatch({ type: "filterOpen" })}>
            <BiFilterAlt className="filter" />
            {state.filterStatus ? "Close" : "Filters"}
          </button>
          {state.filterStatus ? (
            <div className="filterDiv">
              <input
                type="text"
                placeholder="Search Filters"
                onChange={(e) =>
                  dispatch({ type: "searchByColumn", payload: e.target.value })
                }
              />
              <label htmlFor="">Search by ...</label>

              <div className="select">
                <div
                  className="activeValue"
                  onClick={() => dispatch({ type: "openSelecter" })}>
                  {state.selectedOption}
                </div>
                {state.optionStatus ? (
                  <div className="options">
                    <h4
                      id="name"
                      onClick={(e) =>
                        dispatch({
                          type: "selectOption",
                          payload: { value: e.target.id },
                        })
                      }>
                      Name
                    </h4>
                    <h4
                      id="surname"
                      onClick={(e) =>
                        dispatch({
                          type: "selectOption",
                          payload: { value: e.target.id },
                        })
                      }>
                      Surname
                    </h4>
                    <h4
                      id="email"
                      onClick={(e) =>
                        dispatch({
                          type: "selectOption",
                          payload: { value: e.target.id },
                        })
                      }>
                      Email
                    </h4>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <table border={1} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map(
            ({ id, name, surname, email, gender, password }, index) => {
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{surname}</td>
                  <td>{email}</td>
                  <td>{gender}</td>
                  <td>
                    {state.showPassword && state.passwordId === id ? (
                      <>
                        {password}
                        <BiHide
                          onClick={() =>
                            dispatch({ type: "passwordShow", payload: id })
                          }
                        />
                      </>
                    ) : (
                      <>
                        {"*".repeat(password.length)}{" "}
                        <BiShowAlt
                          onClick={() =>
                            dispatch({ type: "passwordShow", payload: id })
                          }
                        />{" "}
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        dispatch({ type: "deleteConfirm", payload: { id: id } })
                      }>
                      <AiOutlineDelete />
                    </button>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "edit",
                          payload: {
                            id: id,
                            name: name,
                            surname: surname,
                            email: email,
                            gender: gender,
                            password: password,
                          },
                        });
                      }}>
                      <MdEditNote />
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {state.editStatus ? (
        <div
          className="editSection"
          onClick={() => dispatch({ type: "close-modal" })}>
          <div className="editModal">
            <div className="title">
              <h3>Edit user</h3>
              <AiOutlineClose
                className="close"
                onClick={() => dispatch({ type: "close-modal" })}
              />
            </div>
            <form action="">
              <div className="item">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={state.editedValues.name}
                  onChange={(e) =>
                    dispatch({
                      type: "changeValue",
                      payload: { value: e.target.value, name: e.target.name },
                    })
                  }
                />
              </div>
              <div className="item">
                <label htmlFor="">Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={state.editedValues.surname}
                  onChange={(e) =>
                    dispatch({
                      type: "changeValue",
                      payload: { value: e.target.value, name: e.target.name },
                    })
                  }
                />
              </div>
              <div className="item">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={state.editedValues.email}
                  onChange={(e) =>
                    dispatch({
                      type: "changeValue",
                      payload: { value: e.target.value, name: e.target.name },
                    })
                  }
                />
              </div>
              <div className="item">
                <label htmlFor="">password</label>
                <input
                  type="text"
                  name="password"
                  value={state.editedValues.password}
                  onChange={(e) =>
                    dispatch({
                      type: "changeValue",
                      payload: { value: e.target.value, name: e.target.name },
                    })
                  }
                />
              </div>
              {/* <div className="item">
                <label htmlFor="">Gender</label>
                <select
                  name="gender"
                  id=""
                  value={state.editedValues.gender}
                  onChange={(e) =>
                    dispatch({
                      type: "changeValue",
                      payload: { value: e.target.value, name: e.target.name },
                    })
                  }>
                  <option value="male">Male</option>
                  <option value="female ">Female</option>
                </select>
              </div> */}
              <div className="itemBtn">
                <button onClick={() => dispatch({ type: "save" })}>Save</button>
                <button onClick={() => dispatch({ type: "close-modal" })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="addBtn" onClick={() => dispatch({ type: "adduser" })}>
        <MdGroupAdd />
      </div>
      {state.addStatus ? (
        <div
          className="addSection"
          onClick={() => dispatch({ type: "addCancel" })}>
          <div className="addModal">
            <div className="title">
              <h3>Add user</h3>
              <AiOutlineClose
                className="close"
                onClick={() => dispatch({ type: "addCancel" })}
              />
            </div>
            <div className="forms">
              <div action="" className={"form"}>
                <div className="item">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={state.addValues.name}
                    onChange={(e) =>
                      dispatch({
                        type: "addNewUserData",
                        payload: {
                          value: e.target.value,
                          name: e.target.name,
                        },
                      })
                    }
                  />
                </div>
                <div className="item">
                  <label htmlFor="">Surname</label>
                  <input
                    type="text"
                    name="surname"
                    value={state.addValues.surname}
                    onChange={(e) =>
                      dispatch({
                        type: "addNewUserData",
                        payload: {
                          value: e.target.value,
                          name: e.target.name,
                        },
                      })
                    }
                  />
                </div>
                <div className="item">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={state.addValues.email}
                    onChange={(e) =>
                      dispatch({
                        type: "addNewUserData",
                        payload: {
                          value: e.target.value,
                          name: e.target.name,
                        },
                      })
                    }
                  />
                </div>
                <div className="item">
                  <label htmlFor="">password</label>
                  <input
                    type="text"
                    name="password"
                    value={state.addValues.password}
                    onChange={(e) =>
                      dispatch({
                        type: "addNewUserData",
                        payload: {
                          value: e.target.value,
                          name: e.target.name,
                        },
                      })
                    }
                  />
                </div>
                <div className="item">
                  <label htmlFor="">Gender</label>
                  <select
                    name="gender"
                    id=""
                    value={state.addValues.gender}
                    onChange={(e) =>
                      dispatch({
                        type: "addNewUserData",
                        payload: {
                          value: e.target.value,
                          name: e.target.name,
                        },
                      })
                    }>
                    <option hidden>Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female ">Female</option>
                  </select>
                </div>
                <div className="itemBtn">
                  <button onClick={() => dispatch({ type: "saveNewUser" })}>
                    Save
                  </button>
                  <button onClick={() => dispatch({ type: "addCancel" })}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {state.deleteConfirmation ? (
        <div className="deleteSureModal">
          <div className="deleteModal">
            <AiOutlineClose
              className="close"
              onClick={() => dispatch({ type: "deleteCancel" })}
            />
            <p>Are you going to delete this User?</p>
            <div className="btns">
              <button onClick={() => dispatch({ type: "deleteCancel" })}>
                Cancel
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "delete", payload: { id: state.deleteId } })
                }>
                OK
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
