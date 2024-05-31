const Notebook = require('../models/notebook')
const Student = require('../models/student')
const Class = require('../models/class')
const Teacher = require('../models/teacher')
const Subject = require('../models/subject')

const notebookData = require('../../data/notebook.json')

const convertData = async (notebook) => {
    const cls = await Class.findOne({ name: notebook.class})
    const teacher = await Teacher.findOne({ email: notebook.teacherEmail })
    const subject = await Subject.findOne({ code: notebook.subjectId })
    const absentStudents = []

    if (!cls || !teacher || !subject) {
        throw new Error('check your data again1!')
    }

    for (let i = 0; i < notebook.absentStudents.length; i++) {
        const student = await Student.findOne({ email: notebook.absentStudents[i]})

        if (!student) {
            throw new Error('check your data again2!')
        }

        absentStudents.push(student._id)
    }


    await Notebook.create({
        class: cls._id,
        subject: subject._id,
        teacher: teacher._id,
        day: notebook.day,
        lesson: notebook.lesson,
        content: notebook.content,
        comment: notebook.comment,
        week: notebook.week,
        absentStudents: absentStudents
    })
}

const getSubject = async (notebook) => {
    for(let i = 0; i < notebook.length; i++) {
        const subject = await Subject.findOne({ code: notebook[i].subjectId })
        console.log(`so dau bai thu ${i}`, notebook[i].subjectId)
        console.log(subject)
        notebook[i].subjectId = subject.name
    }

    return notebook;
}

const insert = async (req, res) => {
    const promises = []
    for(let notebook of notebookData) {
        promises.push(convertData(notebook))
    }

    await Promise.all(promises)

    return res.json({
        success: true,
        message: "insert notebook data successfully!"
    })
}

// const subjectMap = {
//     "001": "Toán",
//     "002": "Văn",
//     "003": "Anh",
//     "004": "Hóa"
// };
const subjectMap = async (subjectCode) => {
    try {
        const subject = await Subject.findOne({ code: subjectCode });
        if (subject) {
            return subject.name;
        } else {
            return null; // hoặc giá trị mặc định khác tùy bạn chọn
        }
    } catch (error) {
        console.error("Error while fetching subject:", error);
        return null; // hoặc xử lý lỗi theo cách khác tùy bạn chọn
    }
};

const teacherMap = async (teacherEmail) => {
    try {
        const teacher = await Teacher.findOne({ email: teacherEmail });
        if (teacher) {
            return teacher.lastName + ' ' + teacher.firstName;
        } else {
            return null; // hoặc giá trị mặc định khác tùy bạn chọn
        }
    } catch (error) {
        console.error("Error while fetching subject:", error);
        return null; // hoặc xử lý lỗi theo cách khác tùy bạn chọn
    }
};

const getAll = async (req, res) => {
    // const notebooks = await getSubject(notebookData)

    // function formatData(data) {
    //     const formattedData = {};
    
    //     data.forEach(record => {
    //         const className = record.class;
    //         const week = record.week;
    
    //         const subject = subjectMap[record.subjectId];

    //         record.subject = subject;
        
    //         if (!formattedData[className]) {
    //             formattedData[className] = {};
    //         }
    
    //         if (!formattedData[className][week]) {
    //             formattedData[className][week] = [];
    //         }
    
    //         formattedData[className][week].push(record);
    //     });
    
    //     return formattedData;
    // }

    // const formattedData  = formatData(notebookData)
    async function formatData(data) {
        const formattedData = {};
    
        for (const record of data) {
            const className = record.class;
            const week = record.week;
    
            const subjectName = await subjectMap(record.subjectId);
            record.subject = subjectName;

            const teacherName = await teacherMap(record.teacherEmail);
            record.teacher = teacherName;
    
            if (!formattedData[className]) {
                formattedData[className] = {};
            }
    
            if (!formattedData[className][week]) {
                formattedData[className][week] = [];
            }
    
            formattedData[className][week].push(record);
        }
    
        return formattedData;
    }

    console.log('test1', notebookData)
    const formattedData  = await formatData(notebookData)

    return res.status(200).json({
        success: true,
        message: "get notebook data successfully",
        notebookData: formattedData
    })
}

module.exports = {
    insert,
    getAll,
}