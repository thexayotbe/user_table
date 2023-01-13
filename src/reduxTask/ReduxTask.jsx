import React from "react";
import "./todoStyle/style.css";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDoneAll } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import {
  onDelete,
  changeStatus,
  selectCategory,
  editStatus,
  editValueChange,
  saveEditedData,
} from "../redux/todoSlice";

const ReduxTask = () => {
  const data = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  return (
    <div className="todo-section">
      <div className="category">
        {" "}
        <h4 onClick={() => dispatch(selectCategory({ columnName: "all" }))}>
          All
        </h4>
        <h4 onClick={() => dispatch(selectCategory({ columnName: "done" }))}>
          Done
        </h4>
        <h4 onClick={() => dispatch(selectCategory({ columnName: "active" }))}>
          Active
        </h4>
        <h4 onClick={() => dispatch(selectCategory({ columnName: "deleted" }))}>
          Deleted
        </h4>
      </div>
      {data.data.map((value) => {
        return (
          <div className="todo-item" key={value.id}>
            <div
              className="checkBox"
              onClick={() => dispatch(changeStatus({ id: value.id }))}>
              {value.completed ? (
                <div className="true">
                  <MdOutlineDoneAll />
                </div>
              ) : (
                <div className="false"></div>
              )}
            </div>

            <div className="item">
              <h3>
                {data.editStatus && value.id === data.editData.id ? (
                  <input
                    type={"text"}
                    value={data.editData.title}
                    onChange={(e) =>
                      dispatch(
                        editValueChange({ changedValue: e.target.value })
                      )
                    }
                  />
                ) : (
                  value.title
                )}
              </h3>
              <div className="btns">
                {data.editStatus && value.id === data.editData.id ? (
                  <FaRegSave
                    className="edit"
                    onClick={() => dispatch(saveEditedData())}
                  />
                ) : (
                  <TbEdit
                    className="edit"
                    onClick={() => dispatch(editStatus({ ...value }))}
                  />
                )}
                <RiDeleteBin6Line
                  className="delete"
                  onClick={() => dispatch(onDelete({ ...value }))}
                />
              </div>
            </div>
          </div>
        );
      })}{" "}
      {data.deletedData.map((value, index) => {
        return <div className="">{value.title}</div>;
      })}
    </div>
  );
};

export default ReduxTask;
