import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "../../redux/index";

export default function Mine() {
  const loginAdmin = useSelector((state) => state.loginAdmin);
  const dispatch = useDispatch();
  return <div>Mine</div>;
}
