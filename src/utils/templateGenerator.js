import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const generateWordFromTemplate = async (templateName, data, outputFileName) => {
  // 1. ดึงไฟล์ต้นฉบับจากโฟลเดอร์ public
  const response = await fetch(`/${templateName}`);
  if (!response.ok) {
    throw new Error(`ไม่พบไฟล์ Template: ${templateName}`);
  }
    
  const content = await response.arrayBuffer();

  // 2. แตกไฟล์ Word (Word คือไฟล์ Zip ประเภทหนึ่ง)
  const zip = new PizZip(content);
  
  // 3. เตรียมตัวแปรสำหรับจับคู่
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // 4. เอาข้อมูล (data) ไปแทนที่ {ตัวแปร} ใน Word
  doc.render(data);

  // 5. บีบอัดกลับเป็น Word และสั่งดาวน์โหลด
  const out = doc.getZip().generate({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
    
  saveAs(out, `${outputFileName}.docx`);
};