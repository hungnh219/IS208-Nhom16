import React, { useState } from "react";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import notebook from "../../data/notebook.json";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const classes = [
  "10A1",
  "10A2",
  "10A3",
  "10A4",
  "11A1",
  "11A2",
  "11A3",
  "11A4",
  "12A1",
  "12A2",
  "12A3",
  "12A4",
];

const NotebookAdmin = () => {
  const [week, setWeek] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const data = notebook.find((item) => item.week == week);

  const handleDownload = async () => {
    const docDefinition = createDocument();
    pdfMake.createPdf(docDefinition).download('document.pdf');
  };

  const handlePreview = async () => {
    const docDefinition = createDocument();
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    
    pdfDocGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setModalIsOpen(true);
    });
  };

  const createDocument = () => {
    const renderRows = () => {
      const days = Object.keys(data.day);
      const rows = [];

      days.forEach((day) => {
        const lessons = data.day[day];
        const rowspan = lessons.length;

        lessons.forEach((lesson, index) => {
          const row = [
            index === 0 ? { text: day, rowSpan: rowspan, alignment: 'center', margin: [0, rowspan * 12, 0, 0] } : '',
            lesson.lesson,
            lesson.subject,
            lesson.content,
            lesson.comment,
            lesson.evaluate,
            lesson.absentStudents.join(', ')
          ];
          rows.push(row);
        });
      });

      return rows;
    };

    return {
      content: [
        { text: 'SỔ ĐẦU BÀI', style: 'header', alignment: 'center' },
        { text: `Lớp: ${data.class}`, style: 'subheader', alignment: 'center' },
        { text: `Tuần: ${data.week}`, style: 'subheader', alignment: 'center' },
        {
          style: 'table',
          table: {
            headerRows: 1,
            body: [
              [
                { text: 'Thứ', style: 'tableHeader' },
                { text: 'Tiết', style: 'tableHeader' },
                { text: 'Môn học', style: 'tableHeader' },
                { text: 'Nội dung', style: 'tableHeader' },
                { text: 'Ghi chú', style: 'tableHeader' },
                { text: 'Đánh giá', style: 'tableHeader' },
                { text: 'Học sinh vắng', style: 'tableHeader' }
              ],
              ...renderRows()
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        subheader: {
          fontSize: 15,
          margin: [0, 5, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        },
        table: {
          margin: [0, 10, 0, 10]
        }
      }
    };
  };

  return (
    <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh] ">
      <Sidebar />
      <div className="basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center mt-[24px]">
          <table className="text-center table-notification border-collapse">
            <thead>
              <tr>
                <th>STT</th>
                <th>Lớp</th>
                <th>Tuần</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row}</td>
                  <td>
                    <select className="border-black border-[1px]"
                      onChange={(e) => { setWeek(e.target.value) }}>
                      {Array.from({ length: 36 }, (_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#3668ff] text-[white] shadow-xl"
                      onClick={handlePreview}>
                      Xem trước
                    </button>
                    <button
                      className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[orange] text-[white] shadow-xl ml-2"
                      onClick={handleDownload}>
                      Xuất file pdf
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Xem trước PDF"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
          },
        }}
      >
        <div>
          <iframe src={previewUrl} width="100%" height="600px"></iframe>
          <div className="flex justify-end">
          <button onClick={() => setModalIsOpen(false)} className="mt-2 px-[16px] py-[4px] bg-[orange] text-[white] shadow-xl">Đóng</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NotebookAdmin;
