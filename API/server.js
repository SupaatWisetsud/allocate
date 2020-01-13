import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/db_allocate");

import express from 'express'
import uploadFile from 'express-fileupload'
import md5 from 'md5'
import cors from 'cors'
import { existsSync, mkdirSync } from 'fs'
import jwt from 'jsonwebtoken'

import { userModel, workModel } from './model'

const app = express();

existsSync(`${__dirname}/img/user`) || mkdirSync(`${__dirname}/img/user`);
existsSync(`${__dirname}/upload`) || mkdirSync(`${__dirname}/upload`);

app.use(cors());
app.use(uploadFile());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/login", async (req, res) => {

    const { username, password } = req.body;
    const user = await userModel.findOne({
        username: username,
        password: md5(password)
    }, "-password").exec();

    if (user !== null) {
        const token = await jwt.sign({ ...user }, "asdasdsads");
        res.json({ token, status: true })
    } else res.json({ status: false });

});

app.post("/api/register", async (req, res) => {

    if (req.files !== null) {
        // await userModel.create({...args, file: `/img/user/${args.img.filename}`});
    } else {
        await userModel.create({ ...req.body });
    }
    res.json({ status: true });
});

app.post("/api/uploadfile", async (req, res) => {

    const { id } = req.body;
    const { file } = req.files;

    const work = await workModel.findById(id).exec();

    for (let n in file) {
        const { mv, name } = await file[n];
        work.path.push(name);
        mv(`./API/upload/${name}`, err => {
            if(err) throw err;
        })
    }

    work.status = "success";
    await work.save();

    res.json({ status: true })
});

app.post("/api/addwork", async (req, res) => {
    res.json(await workModel.create({ ...req.body }))
})

app.post('/api/workme', async (req, res) => {
    const { id, status } = req.body;
    const work = await workModel.findById(id).exec();
    work.status = status;
    await work.save();
    res.json({ status: true })
});

app.post("/api/editprofile/:id", async (req, res) => {
    
    const { id } = req.params;
    const user = await userModel.findById(id).exec();
    
    if(req.files !== null){

    }

});

app.get("/api/newfeeds", async (req, res) => {
    const work = await workModel.find({})
        .nor([{ status: "send" }])
        .populate("worker")
        .populate("commander")
        .exec();

    res.json(work)
});

app.get("/api/users", async (req, res) => {
    const users = await userModel.find({ status: "user" }, "-password").exec();
    res.json(users);
});

app.get("/api/reports", async (req, res) => {
    const reports = await workModel.find({ status: "success" }).populate("worker").exec();
    res.json(reports);
});

app.get("/api/workemes/:id", async (req, res) => {
    const { id } = req.params

    const workme = await workModel.find({ worker: id }).populate('commander').populate('worker').exec();
    res.json(workme);
});

app.get("/api/workorders/:id", async (req, res) => {
    const { id } = req.params;
    const workorder = await workModel.find({ commander: id }).populate("commander").exec();
    res.json(workorder);
});


app.use('/upload', express.static('./API/upload'));


app.listen(4000, console.log('Server running.. on http://localhost:4000/api'));