import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import MyNotification from "../../components/MyNotification/MyNotification";
import { addRoleName, reqRoleInfo,updateRoleName } from "../../api/roleApi";

export default function AddRole({
  open,
  setOpen,
  loadList,
  roleId,
  setRoleId,
}) {
  // 通知框状态
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // 表单实例
  const [form] = Form.useForm();
  // 根据传递的roleId查询完整信息并显示
  useEffect(() => {
    if (roleId !== 0) {
      // 根据roleId发送请求
      reqRoleInfo({ roleId }).then((data) => {
        console.log("addrole", data);
        form.setFieldsValue(data);
      });
    }
  }, [roleId]);

  // 抽屉内部表单的回调
  const onFinish = (values) => {
    console.log(values)
    if (roleId) {
      updateRoleName(values).then(({ success, message }) => {
        if (success) {
          setNotiMsg({ type: "success", description: message });
          // 重新获取表格数据
          loadList();
          onReset();
        } else {
          setNotiMsg({ type: "error", description: message });
        }
      });
    }else{
      addRoleName(values).then(({ success, message }) => {
        if (success) {
          setNotiMsg({ type: "success", description: message });
          // 重新获取表格数据
          loadList();
          onReset();
        } else {
          setNotiMsg({ type: "error", description: message });
        }
      });
    }
    
  };
  // 清空表单的方法
  const onReset = () => {
    form.resetFields();
  };
  // 抽屉关闭的回调
  const onClose = () => {
    onReset();
    // 取消编辑状态
    setRoleId(0);
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title={roleId ? "修改角色" : "添加角色"}
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
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: "请输入角色名称",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色编号"
            name="roleId"
            hidden
          >
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
            {roleId ? "修改" : "添加"}
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
