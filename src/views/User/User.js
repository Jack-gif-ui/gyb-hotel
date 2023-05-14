import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { reqUserList } from "../../api/adminApi";
import AddUser from "./AddUser";

export default function User() {
  //用户列数据
  let [UserList, setUserList] = useState([]);
  let [loginId, setLoginId] = useState(0);
  // 重新加载用户表格数据
  const loadList = () => {
    reqUserList().then(({ data, count }) => {
      console.log("@User", data, count);
      data = data.map((r) => {
        return {
          ...r,
          key: r.loginId,
        };
      });
      setUserList(data);
    });
  };
  //定义加载用户表哥数据的时机
  useEffect(() => {
    loadList();
  }, []);
  //抽屉开关的回调
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  //表格列数据
  const columns = [
    {
      title: "角色编号",
      dataIndex: "roleId",
      key: "roleId",
      width: "100px",
    },
    {
      title: "登录账号",
      dataIndex: "loginId",
      key: "loginId",
      width: "100px",
    },
    {
      title: "登录密码",
      dataIndex: "loginPwd",
      key: "loginPwd",
      width: "100px",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: "100px",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
      width: "100px",
    },
    {
      title: "照片",
      dataIndex: "photo",
      key: "photo",
      width: "100px",
    },
    // {
    //   title: "操作",
    //   key: "action",
    //   render: (ret) => (
    //     <>
    //       <Button
    //         size="small"
    //         style={{ borderColor: "orange", color: "orange" }}
    //         onClick={() => {
    //           edit(ret.roleId);
    //         }}
    //       >
    //         编辑
    //       </Button>
    //       <Popconfirm
    //         title="删除角色"
    //         description="确认删除吗？"
    //         onConfirm={() => {
    //           del(ret.roleId);
    //         }}
    //         onCancel={cancel}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button size="small" danger style={{ marginLeft: "5px" }}>
    //           删除
    //         </Button>
    //       </Popconfirm>
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <div className="search">
        <Button onClick={showDrawer}>添加</Button>
      </div>
      <Table size="small" dataSource={UserList} columns={columns} />
      <AddUser
        open={open}
        setOpen={setOpen}
        loadList={loadList}
        loginId={loginId}
        setLoginId={setLoginId}
      />
    </>
  );
}
