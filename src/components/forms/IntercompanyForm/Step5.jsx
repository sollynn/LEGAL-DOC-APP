import React from 'react';
import { Form, Input, Row, Col, Divider } from 'antd';

export default function Step5() {
  return (
    <Row gutter={16}>
      {/* ---------------- ส่วนที่ 1: ผู้ลงนามฝั่งผู้ให้บริการ ---------------- */}
      <Divider orientation="left" style={{ borderColor: '#aa3bff', color: '#aa3bff' }}>
        ส่วนที่ 1: ผู้ลงนามฝั่งผู้ให้บริการ
      </Divider>
      <Col span={12}>
        <Form.Item name="providerSigner1" label="ชื่อผู้มีอำนาจ 1" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อ-นามสกุล" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="providerPosition1" label="ตำแหน่งของผู้ลงนาม 1" rules={[{ required: true }]}>
          <Input placeholder="ระบุตำแหน่ง" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="providerSigner2" label="ชื่อผู้มีอำนาจ 2 (ถ้ามี)">
          <Input placeholder="ระบุชื่อ-นามสกุล" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="providerPosition2" label="ตำแหน่งของผู้ลงนาม 2 (ถ้ามี)">
          <Input placeholder="ระบุตำแหน่ง" />
        </Form.Item>
      </Col>

      {/* ---------------- ส่วนที่ 2: ผู้ลงนามฝั่งผู้รับบริการ ---------------- */}
      <Divider orientation="left" style={{ borderColor: '#aa3bff', color: '#aa3bff' }}>
        ส่วนที่ 2: ผู้ลงนามฝั่งผู้รับบริการ
      </Divider>
      <Col span={12}>
        <Form.Item name="receiverSigner1" label="ชื่อผู้มีอำนาจ 1" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อ-นามสกุล" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="receiverPosition1" label="ตำแหน่งของผู้ลงนาม 1" rules={[{ required: true }]}>
          <Input placeholder="ระบุตำแหน่ง" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="receiverSigner2" label="ชื่อผู้มีอำนาจ 2 (ถ้ามี)">
          <Input placeholder="ระบุชื่อ-นามสกุล" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="receiverPosition2" label="ตำแหน่งของผู้ลงนาม 2 (ถ้ามี)">
          <Input placeholder="ระบุตำแหน่ง" />
        </Form.Item>
      </Col>

      {/* ---------------- ส่วนพยาน ---------------- */}
      <Divider orientation="left" style={{ borderColor: '#aa3bff', color: '#aa3bff' }}>
        พยานการลงนาม
      </Divider>
      <Col span={12}>
        <Form.Item name="witness1" label="ชื่อ-นามสกุลพยานคนที่ 1" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อ-นามสกุล" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="witness2" label="ชื่อ-นามสกุลพยานคนที่ 2" rules={[{ required: true }]}>
          <Input placeholder="ระบุชื่อ-นามสกุล" />
        </Form.Item>
      </Col>
    </Row>
  );
}