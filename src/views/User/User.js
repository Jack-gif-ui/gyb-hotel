import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Pagination, Select } from "antd";
import { reqUserList, delUserInfo } from "../../api/adminApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import AddUser from "./AddUser";
import { reqroleList } from "../../api/roleApi";

export default function User() {
  //用户列数据
  let [UserList, setUserList] = useState([]);
  let [loginId, setLoginId] = useState(0);
  // 通知框状态
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // 总条数
  let [count, setCount] = useState(0);
  // 页码
  let [pageIndex, setPageIndex] = useState(0);
  let [roleList, setRoleList] = useState([]);
  let [roleId, setRoleId] = useState(0);
  // 重新加载用户表格数据
  const loadList = () => {
    reqUserList({ roleId,pageIndex }).then(({ data, count }) => {
      console.log("@User", data, count);
      data = data.map((r) => {
        return {
          ...r,
          key: r.loginId,
          roleName: r.roleName,
        };
      });
      setUserList(data);
      setCount(count);
    });
  };
  // 重新加载角色数据
  const loadRoleList = () => {
    reqroleList().then((data) => {
      // console.log(data)
      data = data.map((r) => {
        return {
          value: r.roleId,
          label: r.roleName,
        };
      });
      data.unshift({ value: 0, label: "请选择角色" });
      setRoleList(data);
    });
  };

  //抽屉开关的回调
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  // 编辑回调
  const edit = (loginId) => {
    console.log("@@@", loginId);
    setOpen(true);
    // 设置当前Id为编辑状态
    setLoginId(loginId);
  };
  // 气泡框的取消回调
  const cancel = (e) => {
    //console.log(e);
    message.error("取消删除");
  };
  //  删除角色的回调
  const del = (id, photo) => {
    delUserInfo({ id, photo }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        // 重新获取表格数据
        loadList();
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
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
      title: "角色name",
      dataIndex: "roleName",
      key: "roleName",
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
      width: "150px",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: "150px",
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
      width: "200px",
      render: (ret) => (
        //console.log(ret)
        <img src={ret} style={{ width: "30px", height: "30px" }} />
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (ret) => (
        <>
          <Button
            size="small"
            style={{ borderColor: "orange", color: "orange" }}
            onClick={() => {
              edit(ret.loginId);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="删除角色"
            description="确认删除吗？"
            onConfirm={() => {
              del(ret.id, ret.photo);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger style={{ marginLeft: "5px" }}>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  //定义加载用户表哥数据的时机
  useEffect(() => {
    loadList();
    loadRoleList();
  }, []);

  return (
    <>
      <div className="search">
        <span>角色：</span>
        <Select
          options={roleList}
          style={{ width: "200px" }}
          defaultValue={0}
          onSelect={(value) => {
            //console.log('roleId',value);
            setRoleId(value);
          }}
        />
        <Button
          onClick={() => {
            //console.log("click query");
            loadList();
          }}
          style={{ marginLeft: "5px" }}
          type="primary"
        >
          查询
        </Button>

        <Button onClick={showDrawer} style={{ marginLeft: "5px" }}>
          添加
        </Button>
      </div>
      <Table
        size="small"
        dataSource={UserList}
        columns={columns}
        pagination={false}
      />
      <Pagination
        size="small"
        defaultCurrent={pageIndex}
        total={count}
        pageSize={8}
      />
      <AddUser
        open={open}
        setOpen={setOpen}
        loadList={loadList}
        loginId={loginId}
        setLoginId={setLoginId}
      />
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
