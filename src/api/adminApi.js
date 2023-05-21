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
  //console.log(data);
  return data;
};

// 添加用户
export const addUserList = async (params) => {
  let { data } = await axios.post("Admin/Add",{params});
  //console.log('admin',data);
  return data;
};

// 根据账号获取用户信息
export const reqUserInfo = async (params) => {
  let { data } = await axios.get("Admin/GetOne",{params});
  //console.log('$api',data);
  return data;
};

// 修改用户信息
export const updateUserInfo = async (params) => {
  let { data } = await axios.get("Admin/Update",{params});
  //console.log('$api',data);
  return data;
};
// 删除用户信息
export const delUserInfo = async (params) => {
  let { data } = await axios.get("Admin/Delete",{params});
  //console.log('$api',data);
  return data;
};