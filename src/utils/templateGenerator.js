import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const generateWordFromTemplate = async (templateName, data, outputName) => {
  // ไม่ต้องใช้ message ของ antd ในไฟล์นี้แล้ว
  
  const response = await fetch(`/${templateName}`);
  // ถ้าหาไฟล์ไม่เจอ ให้โยน Error ออกไปให้ index.jsx จัดการ
  if (!response.ok) {
    throw new Error(`ไม่พบไฟล์ Template: ${templateName} (เช็คว่าอยู่ในโฟลเดอร์ public หรือยัง?)`);
  }
    
  const content = await response.arrayBuffer();

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);

  const out = doc.getZip().generate({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
    
  saveAs(out, `${outputName}.docx`);
};