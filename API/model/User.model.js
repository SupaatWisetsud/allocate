import mongoose from 'mongoose'; // เรียกใช้หรือ import ตัว mongoose 
import md5 from 'md5'; // เรียกใช้หรือ import ตัว md5 เพื่อใช้ในการเข้ารหัส
const Schema = mongoose.Schema // ประกาศตัวแปรชื่อว่า Schema แล้วเก็บ mongoose.Schema ไว้เพื่อเราจะเรียกใช้

const userSchema = new Schema({ // สร้างอินสแตนท์ตัว Schema ชื่อ userSchema
    username: { 
        type: String, // ให้ type ฟิวส์นี่เป็น string
        unique: true, //ไม่อนุญาติให้ซ้ำ
        required: "Username is required", //ไม่อนุญาติให้ว่าง ถ้าว่างจะขึ้นข้อความ Username is required
        trim: true //ตัดช่องว่างต้นและท้ายสตริง
    },
    password: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        required: "Password is required", //ไม่อนุญาติให้ว่าง ถ้าว่างจะขึ้นข้อความ Password is required
        trim: true //ตัดช่องว่างต้นและท้ายสตริง
    },
    firstname: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        required: "First name is required", //ไม่อนุญาติให้ว่าง ถ้าว่างจะขึ้นข้อความ First name is required
        trim: true //ตัดช่องว่างต้นและท้ายสตริง
    },
    lastname: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        required: "Last name is required", //ไม่อนุญาติให้ว่าง ถ้าว่างจะขึ้นข้อความ Last name is required
        trim: true //ตัดช่องว่างต้นและท้ายสตริง
    },
    email: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        required: "Email is required", //ไม่อนุญาติให้ว่าง ถ้าว่างจะขึ้นข้อความ Email is required
        unique: true, //ไม่อนุญาติให้ซ้ำ
        trim: true //ตัดช่องว่างต้นและท้ายสตริง
    },
    img: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        trim: true, //ตัดช่องว่างต้นและท้ายสตริง
        default: "/img/system/user.png"  //ถ้าไม่มีการใส่ค่ามาที่ฟิวส์นี่ก็จะ default เป็น "/img/system/user.png"
    },
    phone: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        required: "Number phone is required", //ไม่อนุญาติให้ว่าง ถ้าว่างจะขึ้นข้อความ Number phone is required
        trim: true, //ตัดช่องว่างต้นและท้ายสตริง
    },
    status: {
        type: String, // ให้ type ฟิวส์นี่เป็น string
        enum: ['admin', 'user'], //enum ก็คือให้ใส่ได้แค่ 2 ค่านี่เท่านั้นคือ admin กับ user
        default: 'user' //ถ้าไม่มีการใส่ค่ามาที่ฟิวส์นี่ก็จะ default เป็น user
    }
});

userSchema.pre('save', function(next){ //ก่อนที่จะมีการ save ลง collection มันจะทำ function นี่ก่อน ก็คือการเข้ารหัส
    if(this.password){ //เช็คว่ามี password ไหม
        this.password = md5(this.password); //ถ้ามีก็จะมีการเข้ารหัสในรูปแบบของ md5
    }
    next(); //แล้วค่อยสั่งให้มันทำงาน middleware ต่อไป
});

const userModel = mongoose.model("User", userSchema);   //เอา schema ที่สร้างยัดใส่ mongodb ซึ่งจะยัด userSchema ที่เราสร้างลงไป
                                                        //แล้วจะได้ collection ที่ชื่อ user มันจะเติบ s ให้อัตโนมัสเป็น users
export default userModel; //export userModel ออกไปเพื่อเรียกใช้