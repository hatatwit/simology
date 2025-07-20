import { useTheme } from "@contexts/ThemeContext";
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import {
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiFillCaretDown,
  AiOutlineUser,
} from "react-icons/ai";
import { MdPets } from "react-icons/md";

import { Link, Outlet } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: ".gedcom",
  },
  { key: "2", label: ".json" },
  { key: "3", label: ".png" },
];

const { Header, Sider, Content, Footer } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapsed} theme="light">
        <Link
          to={"/"}
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "start",
            padding: collapsed ? 0 : "0 16px",
          }}
        >
          <img
            src="/simology.svg"
            alt="Logo"
            style={{
              height: 32,
              transition: "all 0.2s",
              objectFit: "contain",
            }}
          />
          {!collapsed && (
            <Typography.Title level={4} style={{ marginLeft: 8 }}>
              Simology
            </Typography.Title>
          )}
        </Link>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <div
                  onDragStart={(e) => onDragStart(e, "sim")}
                  draggable
                  className="cursor-move"
                >
                  <AiOutlineUser />
                </div>
              ),
              label: "Sim",
            },
            {
              key: "2",
              icon: (
                <div
                  onDragStart={(e) => onDragStart(e, "pet")}
                  draggable
                  className="cursor-move"
                >
                  <MdPets />
                </div>
              ),
              label: "Pet",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? <AiOutlineDoubleRight /> : <AiOutlineDoubleLeft />
            }
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Button>
              <AiOutlineUpload />
            </Button>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  <AiOutlineDownload />
                  <AiFillCaretDown />
                </Space>
              </Button>
            </Dropdown>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              style={{
                backgroundColor: isDarkMode ? "#333" : "#ccc",
              }}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          © 2025 Simology. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
