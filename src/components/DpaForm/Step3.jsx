import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

export default function Step3() {
  return (
    <Form.Item name="purpose" label="วัตถุประสงค์ที่บริษัทฯ มอบหมายให้คู่สัญญาดำเนินการเกี่ยวกับข้อมูลส่วนบุคคล" rules={[{required: true}]}>
      <TextArea rows={6} />
    </Form.Item>
  );
}