import React from 'react';
import { Form, Button, Space, Steps, Card, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { useStore } from '../../../store'; 
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3'; 
import Step4 from './Step4'; 
import Step5 from './Step5'; 

import { generateWordFromTemplate } from '../../../utils/templateGenerator';

export default function IntercompanyForm() {
  const { currentStep, setCurrentStep, reset } = useStore();
  const [form] = Form.useForm();

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields([
          'copyType', 'contractDate', 'countryLaw', 'providerName', 'providerContact', 
          'providerAddress', 'providerEmail', 'receiverName', 'receiverContact', 
          'receiverAddress', 'receiverEmail', 'receiverBusiness', 'serviceBrief'
        ]);
      } else if (currentStep === 1) {
        await form.validateFields(['effectiveDate', 'serviceDetail']);
      } else if (currentStep === 2) {
        await form.validateFields(['companyGroup']); // หน้าประเภทบริษัท
      } else if (currentStep === 3) {
        await form.validateFields(['renewalOption']); // หน้าเงื่อนไขการต่ออายุ
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
    }
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const handleFinish = async () => {
    try {
      const values = form.getFieldsValue(true);

      const dataToFill = {
        // Step 1
        copyType: values.copyType || "",
        contractDate: values.contractDate ? values.contractDate.format('DD/MM/YYYY') : "",
        countryLaw: values.countryLaw || "",
        providerName: values.providerName || "",
        providerContact: values.providerContact || "",
        providerAddress: values.providerAddress || "",
        providerEmail: values.providerEmail || "",
        receiverName: values.receiverName || "",
        receiverContact: values.receiverContact || "",
        receiverAddress: values.receiverAddress || "",
        receiverEmail: values.receiverEmail || "",
        receiverBusiness: values.receiverBusiness || "",
        serviceBrief: values.serviceBrief || "",

        // Step 2
        effectiveDate: values.effectiveDate ? values.effectiveDate.format('DD/MM/YYYY') : "",
        serviceDetail: values.serviceDetail || "",

        // Step 3
        companyGroup: values.companyGroup || "",

        // Step 4
        renewalOption: values.renewalOption || "",

        // Step 5
        providerSigner1: values.providerSigner1 || "",
        providerPosition1: values.providerPosition1 || "",
        providerSigner2: values.providerSigner2 || "",
        providerPosition2: values.providerPosition2 || "",
        receiverSigner1: values.receiverSigner1 || "",
        receiverPosition1: values.receiverPosition1 || "",
        receiverSigner2: values.receiverSigner2 || "",
        receiverPosition2: values.receiverPosition2 || "",
        witness1: values.witness1 || "",
        witness2: values.witness2 || ""
      };

      await generateWordFromTemplate(
        'intercompany_template.docx', 
        dataToFill, 
        `Intercompany_${values.providerName || 'Contract'}`
      );
      
      message.success('สร้างเอกสาร Word เรียบร้อยแล้ว!');
      reset(); 
      form.resetFields(); 
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการสร้างเอกสาร: ' + error.message);
      console.error(error);
    }
  };

  const stepsItems = [
    { title: 'ข้อมูลหลัก' }, 
    { title: 'รายละเอียดบริการ' },
    { title: 'ประเภทบริษัท' },
    { title: 'เงื่อนไขสัญญา' },
    { title: 'ผู้ลงนาม' }
  ];

  return (
    <Card title="แบบฟอร์มสัญญาระหว่างบริษัท (Intercompany)">
      <Steps current={currentStep} items={stepsItems} style={{ marginBottom: 30 }} />
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        
        <div style={{ display: currentStep === 0 ? 'block' : 'none' }}><Step1 /></div>
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}><Step2 /></div>
        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}><Step3 /></div>
        <div style={{ display: currentStep === 3 ? 'block' : 'none' }}><Step4 /></div>
        <div style={{ display: currentStep === 4 ? 'block' : 'none' }}><Step5 /></div>

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            {currentStep > 0 && <Button onClick={handlePrev}>ย้อนกลับ</Button>}
            {currentStep < 4 ? (
              <Button type="primary" onClick={handleNext}>ถัดไป</Button>
            ) : (
              <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>สร้าง Word</Button>
            )}
          </Space>
        </div>
      </Form>
    </Card>
  );
}