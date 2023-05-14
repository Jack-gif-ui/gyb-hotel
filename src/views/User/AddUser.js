import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import MyNotification from "../../components/MyNotification/MyNotification";
import { reqUserList, addUserList } from "../../api/adminApi";
import { reqroleList } from "../../api/roleApi";
import UploadImg from './UploadImg'



export default function AddUser({
  open,
  setOpen,
  loadList,
  loginId,
  setLoginId,
}) {
  // 通知框状态
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  let [roleList, setRoleList] = useState([]);
  // 表单实例
  const [form] = Form.useForm();
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
      setRoleList(data);
    });
  };
  // 根据传递的roleId查询完整信息并显示
  useEffect(() => {
    // 加载用户列表
    loadRoleList();
    // if (roleId !== 0) {
    //   // 根据roleId发送请求
    //   reqRoleInfo({ roleId }).then((data) => {
    //     console.log("addrole", data);
    //     form.setFieldsValue(data);
    //   });
    // }
  }, []);
  // 清空表单的方法
  const onReset = () => {
    form.resetFields();
  };
  // 抽屉关闭的回调
  const onClose = () => {
    onReset();
    // 取消编辑状态
    setLoginId(0);
    setOpen(false);
  };

  // 抽屉内部表单的回调
  const onFinish = (values) => {
    console.log(values);
    if (!loginId) {
      //   updateRoleName(values).then(({ success, message }) => {
      //     if (success) {
      //       setNotiMsg({ type: "success", description: message });
      //       // 重新获取表格数据
      //       loadList();
      //       onReset();
      //     } else {
      //       setNotiMsg({ type: "error", description: message });
      //     }
      //   });
      // }else{
      addUserList(values).then(({ success, message }) => {
        if (success) {
          setNotiMsg({ type: "success", description: message });
          // 重新获取表格数据
          loadList();
          onClose();
        } else {
          setNotiMsg({ type: "error", description: message });
        }
      });
    }
  };

  return (
    <>
      <Drawer
        title={loginId ? "修改账户" : "添加账号"}
        placement="right"
        onClose={onClose}
        open={open}
        width={500}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="编号" name="id" hidden></Form.Item>
          <Form.Item
            label="账户编号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号编号",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入姓名",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            rules={[
              {
                required: true,
                message: "请输入电话",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="照片"
            name="photo"
            rules={[
              {
                required: true,
                message: "请上传照片",
              },
            ]}
          >
           <UploadImg form={form}/>
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId"
            rules={[
              {
                required: true,
                message: "请选择角色",
              },
            ]}
          >
            <Select options={roleList} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {loginId ? "修改账户" : "添加账号"}
            </Button>
            <Button style={{ marginLeft: "10px" }} onClick={onClose}>
              取消
            </Button>
          </Form.Item>
          <MyNotification notiMsg={notiMsg} />
        </Form>
      </Drawer>
    </>
  );
}
