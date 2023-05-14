import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { reqroleList, delRoleName } from "../../api/roleApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import AddRole from "./AddRole";
import "./Role.scss";

export default function Role() {
  // 编辑状态Id，是0不需要编辑，否则需要
  let[roleId,setRoleId] = useState(0)
  
  let [roleList, setRoleList] = useState([]);
  // 通知框状态
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

  useEffect(() => {
    loadList();
  }, []);

  // 重新加载角色数据
  const loadList = () => {
    reqroleList().then((data) => {
      // console.log(data)
      data = data.map((r) => {
        return {
          ...r,
          key: r.roleId,
        };
      });
      setRoleList(data);
    });
  };

  // 抽屉开关的回调
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  //  删除角色的回调
  const del = (roleId) => {
    delRoleName({ roleId }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        // 重新获取表格数据
        loadList();
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };

  const columns = [
    {
      title: "角色编号",
      dataIndex: "roleId",
      key: "roleId",
      width: "100px",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
      width: "200px",
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
              edit(ret.roleId);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="删除角色"
            description="确认删除吗？"
            onConfirm={() => {
              del(ret.roleId);
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
  // 气泡框的取消回调
  const cancel = (e) => {
    //console.log(e);
    message.error("取消删除");
  };
  // 编辑回调
  const edit = (roleId) => {
    setOpen(true);
    // 设置当前Id为编辑状态
    setRoleId(roleId)
  };
  return (
    <>
      <div className="search">
        <Button onClick={showDrawer}>添加</Button>
      </div>
      <Table size="small" dataSource={roleList} columns={columns} />
      <AddRole open={open} setOpen={setOpen} loadList={loadList} roleId={roleId} setRoleId={setRoleId} />
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
