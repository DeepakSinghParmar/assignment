import axios from "axios";
import { addAll } from "../slicers/AllDataSlice";

export const fetchAlldata = async (dispatch) => {
  const response = await axios.get(
    "https://media-content.ccbp.in/website/react-assignment/resources.json"
  );

  if (response?.data?.length) {
    dispatch(addAll({ data: response?.data }));
  }

};
