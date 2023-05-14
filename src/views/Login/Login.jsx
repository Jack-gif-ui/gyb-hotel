import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import "./Login.scss";
import { login } from "../../api/adminApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // 判断是否已经登录
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  },[navigate]);

  const [form] = Form.useForm();
  // 通知框状态
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

  const onFinish = async (values) => {
    const { message, success } = await login(values);
    // 判断是否登录成功
    if (success) {
      setNotiMsg({ type: "success", description: message });
      navigate("/home");
    } else {
      setNotiMsg({ type: "error", description: message });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="login">
      <div className="content">
        <h2>酒店后台管理</h2>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            loginId: "",
            loginpwd: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="loginId"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button style={{ marginLeft: "196px" }} onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <MyNotification notiMsg={notiMsg} />
    </div>
  );
}
