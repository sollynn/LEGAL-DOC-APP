import React from 'react';
import { Form, Input, DatePicker, Row, Col } from 'antd';

const { TextArea } = Input;

export default function Step2() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="effectiveDate" label="ระบุวันที่สัญญามีผล" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="serviceDetail" label="บริการ (รายละเอียดฉบับเต็ม)" rules={[{ required: true }]}>
          <TextArea rows={6} placeholder="ระบุรายละเอียดการให้บริการทั้งหมด" />
        </Form.Item>
      </Col>
    </Row>
  );
}