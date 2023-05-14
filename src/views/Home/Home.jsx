import React from "react";
import {
  MenuFoldOutlined,
  DollarOutlined,
  UserOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Modal } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Home.scss";
const { Header, Sider, Content } = Layout;

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // 判断是否已经登录
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // 右侧导航菜单数据源
  const items = [
    {
      label: "首页",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "邮件",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "通知",
      key: "noti",
      icon: <MessageOutlined />,
    },
    {
      label: "个人中心",
      key: "mine",
      icon: <SettingOutlined />,
      children: [
        {
          key: "my",
          label: "个人信息",
        },
        {
          key: "pwd",
          label: "修改密码",
        },
        {
          key: "exit",
          label: "退出登录",
        },
      ],
    },
  ];
  // 右侧导航回调
  const [current, setCurrent] = useState("mine");
  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
    // 判断点击的菜单项是哪一个
    switch (e.key) {
      case "exit":
        setIsModalOpen(!isModalOpen);
        break;
      // 角色管理
      case "role":
        navigate("/home/role");
        break;
      // 用户管理
      case "user":
        navigate("/home/user");

      default:
        break;
    }
  };

  // 折叠按钮的回调
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 退出模态框的回调
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    localStorage.clear();
    navigate("/");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {collapsed ? "Hilton" : "Hilton酒店管理系统"}
        </div>
        <Menu
          onClick={onClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DollarOutlined />,
              label: "账户管理",
              children: [
                {
                  key: "role",
                  label: "角色管理",
                },
                {
                  key: "user",

                  label: "用户管理",
                },
              ],
            },
            {
              key: "2",
              icon: <HomeOutlined />,
              label: "客房管理",
              children: [
                {
                  key: "type",

                  label: "房型管理",
                },
                {
                  key: "room",

                  label: "房间管理",
                },
                {
                  key: "total",

                  label: "营业统计",
                },
              ],
            },
            {
              key: "customer",
              icon: <UserOutlined />,
              label: "客户管理",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* 右侧导航菜单 */}
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ display: "flex", paddingRight: "5px" }}
          />
          {/* 退出模态框 */}
          <Modal
            title="您要退出吗"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
          </Modal>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
