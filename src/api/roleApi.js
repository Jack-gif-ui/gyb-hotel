import axios from "../utils/request";

// 角色列表的请求
export const reqroleList = async () => {
  let { data } = await axios.get("Role/List");
  // console.log(data);
  return data;
};

// 利用roleName添加角色
export const addRoleName = async (params) => {
  let { data } = await axios.post("Role/Add", params);

  return data;
};
// 利用roleName更新角色
export const updateRoleName = async (params) => {
  let { data } = await axios.post("Role/Update", params);
  return data;
};
// 利用roleId删除角色
export const delRoleName = async (params) => {
  let { data } = await axios.post("Role/Delete", params);
  console.log(data);
  return data;
};
// 利用roleId获取角色
export const reqRoleInfo = async (params) => {
  let { data } = await axios.get("Role/GetOne", {params});
  console.log(data);
  return data;
};
