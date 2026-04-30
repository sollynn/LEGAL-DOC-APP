import React from 'react';
import { Form, Radio, Row, Col } from 'antd';

export default function Step4() {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item name="renewalOption" label="เงื่อนไขระยะเวลาสัญญา" rules={[{ required: true, message: 'กรุณาเลือกเงื่อนไข' }]}>
          <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Radio value="กำหนดระยะเวลาแน่นอน">
              ตัวเลือกที่ 1: กำหนดระยะเวลาแน่นอน
            </Radio>
            <Radio value="ต่ออายุสัญญาแบบโดยส่งหนังสือแจ้ง">
              ตัวเลือกที่ 2: ต่ออายุสัญญาแบบโดยส่งหนังสือแจ้ง
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  );
}