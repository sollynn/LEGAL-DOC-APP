import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useStore } from './store';
import Home from './components/Home';
import DpaForm from './components/DpaForm';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function App() {
  const { selectedDoc, reset } = useStore();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>Legal Doc Generator</Title>
        {selectedDoc && (
          <Button ghost icon={<ArrowLeftOutlined />} onClick={reset}>
            กลับหน้าหลัก
          </Button>
        )}
      </Header>
      
      <Content style={{ padding: '40px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        {!selectedDoc ? <Home /> : <DpaForm />}
      </Content>
    </Layout>
  );
}