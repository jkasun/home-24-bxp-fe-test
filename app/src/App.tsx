import { useState, useEffect } from 'react'
import { Layout, Menu, theme, App as AntApp, Button } from 'antd'
import {
  ShopOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Routes } from './routes/Routes'
import { Login } from './components/LoginPage/Login'

const { Header, Content, Sider } = Layout

type MenuKey = 'products' | 'categories'

function AppContent() {
  const [selectedKey, setSelectedKey] = useState<MenuKey>('products')
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const { user, logout } = useAuth()
  const { token } = theme.useToken()
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    {
      key: 'products',
      icon: <ShopOutlined />,
      label: 'Products'
    },
    {
      key: 'categories',
      icon: <AppstoreOutlined />,
      label: 'Categories'
    }
  ];

  if (!user?.isAuthenticated) {
    return <Login />;
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key as MenuKey);
    navigate(`/${key}`);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ background: token.colorBgContainer }}>
      <Header className="header">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSider}
          className="menu-trigger"
        />
        <div className="logo">
          <DatabaseOutlined style={{ fontSize: '24px', color: token.colorPrimary }} />
          <span className="logo-text" style={{ marginLeft: '8px', fontSize: '18px', fontWeight: 'bold' }}>
            Product Management
          </span>
        </div>
        <div className="header-right">
          <span className="welcome-text" style={{ color: token.colorTextSecondary, marginRight: '16px' }}>
            Welcome, {user.username}
          </span>
          <LogoutOutlined
            onClick={logout}
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: token.colorTextSecondary
            }}
          />
        </div>
      </Header>
      <Layout style={{ background: token.colorBgContainer }}>
        <Sider
          width={200}
          className="site-sider"
          collapsible
          collapsed={collapsed}
          collapsedWidth={isMobile ? 0 : 80}
          trigger={null}
          style={{ background: token.colorBgContainer }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout className="site-layout" style={{
          background: token.colorBgContainer,
          marginLeft: isMobile ? 0 : (collapsed ? '80px' : '200px')
        }}>
          <Content className="site-content">
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

function App() {
  return (
    <AntApp>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter >
    </AntApp>

  )
}

export default App
