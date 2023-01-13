import { createSlice } from "@reduxjs/toolkit";
import { mocData } from "../reduxTask/mocData";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: mocData,
    deletedData: [],
    copyData: [],
    editStatus: false,
    editData: {},
  },
  reducers: {
    onDelete(state, action) {
      return {
        ...state,
        deletedData: [...state.deletedData, action.payload],
        data: state.data.filter((value) => value.id !== action.payload.id),
      };
    },
    changeStatus(state, action) {
      return {
        ...state,
        data: state.data.map((value) =>
          value.id === action.payload.id
            ? { ...value, completed: !value.completed }
            : value
        ),
      };
    },
    selectCategory(state, action) {
      switch (action.payload.columnName) {
        case "active":
      }
    },
    editStatus(state, action) {
      return {
        ...state,
        editStatus: true,
        editData: action.payload,
      };
    },
    editValueChange(state, action) {
      return {
        ...state,
        editData: {
          ...state.editData,
          title: action.payload.changedValue,
        },
      };
    },
    saveEditedData(state, action) {
      return {
        ...state,
        data: state.data.map((value) =>
          value.id === state.editData.id ? { ...state.editData } : value
        ),
        editStatus: false,
        editData: {},
      };
    },
  },
});
export const {
  onDelete,
  changeStatus,
  selectCategory,
  editStatus,
  editValueChange,
  saveEditedData,
} = todoSlice.actions;
export default todoSlice.reducer;
