import React from 'react';
import { Card } from 'antd';
import { useStore } from '../store';

export default function Home() {
  const { setSelectedDoc } = useStore();
  return (
    <Card hoverable onClick={() => setSelectedDoc('DPA')} title="เลือกประเภทกฎหมาย" style={{ width: 300 }}>
      กดเพื่อเริ่มกรอกข้อมูลสร้างเอกสาร DPA
    </Card>
  );
}