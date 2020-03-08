import mongoose from 'mongoose';  // เรียกใช้หรือ import ตัว mongoose 
const Schema = mongoose.Schema; // ประกาศตัวแปรชื่อว่า Schema แล้วเก็บ mongoose.Schema ไว้เพื่อเราจะเรียกใช้

const workSchema = new Schema({ // สร้างอินสแตนท์ตัว Schema ชื่อ workSchema
    title: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        required: "Title is required", //ไม่อนุญาติให้ว่าง ถ้าว่างจะขึ้นข้อความ Title is required
        trim: true //ตัดช่องว่างต้นและท้ายสตริง
    },
    detail: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        trim: true //ตัดช่องว่างต้นและท้ายสตริง
    },
    worker: {
        type: Schema.ObjectId, // ให้ type เป็น Object id โดย ref ไปที่ collection User
        ref: "User",
    },
    commander: {
        type: Schema.ObjectId, // ให้ type เป็น Object id โดย ref ไปที่ collection User
        ref: "User",
    },
    deadline: Date,  // ให้ type ฟิวส์นี่เป็น date
    datestatus: {
        type: Date,  // ให้ type ฟิวส์นี่เป็น date
        required: true, //ไม่อนุญาติให้ว่าง
        default: () => Date.now() //ค่า default เป็นเวลาปัจุบัน
    },
    datesubmit: Date, // ให้ type ฟิวส์นี่เป็น date
    status: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        enum: ['send', 'proceed', 'success'], //enum ก็คือให้ใส่ได้แค่ 2 ค่านี่เท่านั้นคือ send, proceed กับ success
        default: "send" //ค่า default เป็น send 
    },
    path: []  //ฟิวส์ path ใช้ในการเก็บ path ของไฟล์
})

const workModel = mongoose.model("Work", workSchema);   //เอา schema ที่สร้างยัดใส่ mongodb ซึ่งจะยัด workSchema ที่เราสร้างลงไป
                                                        //แล้วจะได้ collection ที่ชื่อ work มันจะเติบ s ให้อัตโนมัสเป็น works
export default workModel; //export workModel ออกไปเพื่อเรียกใช้