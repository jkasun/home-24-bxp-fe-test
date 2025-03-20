import { Form, Input, Button, Card, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Login.module.css';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormData {
  username: string;
  password: string;
}

export const Login = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();

  const handleSubmit = async (values: LoginFormData) => {
    await login(values);
  };

  return (
    <div className={styles.container}>
      <Card
        title="Product Management System"
        className={styles.card}
        styles={{
          header: {
            textAlign: 'center',
            fontSize: '24px',
            borderBottom: '1px solid #f0f0f0'
          }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ username: 'admin@organization.com', password: 'password123' }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Log in
            </Button>
          </Form.Item>

          <div className={styles.helpText}>
            Use admin@organization.com/password123 to login
          </div>
        </Form>
      </Card>
    </div>
  );
}; 