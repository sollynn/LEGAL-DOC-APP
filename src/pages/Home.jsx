import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import { FORM_LIST } from '../constants/formConfigs';
import { useStore } from '../store'; // เพื่อเอาไว้ reset step

const { Title, Text } = Typography;

export default function Home() {
  const [selectedFormId, setSelectedFormId] = useState(null);
  const { reset } = useStore();

  // ฟังก์ชันเวลากดปุ่มย้อนกลับ
  const handleBack = () => {
    reset(); // รีเซ็ต Step ให้กลับไปหน้า 1
    setSelectedFormId(null);
  };

  // หา Component ของฟอร์มที่ผู้ใช้คลิกเลือก
  const activeForm = FORM_LIST.find(f => f.id === selectedFormId);

  // 🌟 ถ้ามีการเลือกฟอร์มแล้ว ให้แสดงฟอร์มนั้นๆ
  if (activeForm && activeForm.component) {
    const FormComponent = activeForm.component;
    return (
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <Button onClick={handleBack} style={{ marginBottom: 20 }}>
          ⬅ ย้อนกลับไปหน้าเลือกประเภทสัญญา
        </Button>
        {/* เรียกใช้ Component ที่เลือก เช่น DpaForm */}
        <FormComponent />
      </div>
    );
  }

  // 🌟 ถ้ายังไม่เลือก ให้แสดงหน้าการ์ดเมนู
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
        เลือกระบบสร้างเอกสารกฎหมาย
      </Title>
      
      <Row gutter={[24, 24]}>
        {FORM_LIST.map((form) => (
          <Col xs={24} sm={12} md={8} key={form.id}>
            <Card hoverable title={form.title} style={{ height: '100%' }}>
              <p style={{ minHeight: '60px' }}>
                <Text type="secondary">{form.description}</Text>
              </p>
              <Button 
                type="primary" 
                block
                onClick={() => setSelectedFormId(form.id)}
                disabled={!form.component} // ถ้าค่า component เป็น null ปุ่มจะกลายเป็นสีเทา
              >
                {form.component ? 'เริ่มสร้างเอกสาร' : 'อยู่ระหว่างพัฒนา'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}