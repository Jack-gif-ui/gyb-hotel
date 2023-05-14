import axios from "../utils/request";

export const login = async (params) => {
  let { data } = await axios.get("Admin/Login", { params });
  if (data.success) {
    localStorage.setItem("token", data.token);
  }
  return data;
};


// 获取用户列表
export const reqUserList = async (params) => {
  let { data } = await axios.get("Admin/List",{params});
  console.log(data);
  return data;
};
// 添加用户
export const addUserList = async (params) => {
  let { data } = await axios.post("Admin/Add",{params});
  console.log('admin',data);
  return data;
};