import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { createWriteStream } from 'fs'
import path from 'path'
import { GraphQLDateTime } from 'graphql-iso-date'
import { userModel, workModel } from '../model'

export const resolvers = {
    Date: GraphQLDateTime,
    Query: {
        newfeeds: async (parent, args, context, info) => {
            
            if(!context.user) throw new Error("Please log in")
            
            const work = await workModel.find({})
                .nor([{ status: "send" }])
                .populate("worker")
                .populate("commander")
                .sort({datestatus: "desc"})
                .exec();

            return work
        },
        users: async () => await userModel.find({ status: "user" }, "-password").exec(),
        report: async () => await workModel.find({ status: "success" }).populate("worker").exec(),
        workme: async (parent, { id, status }) => await workModel.find({ worker: id }).populate('commander').populate('worker').exec(),
        workorder: async (parent, { id }, context, info) => await workModel.find({ commander: id }).populate("commander").populate('worker').exec()
    },
    Mutation: {
        login: async (parent, { username, password }, context, info) => {

            let result = { token: null, status: false };

            const user = await userModel.findOne({
                username: username,
                password: md5(password)
            }, "-password").exec();

            if (user !== null) {
                const token = await jwt.sign({ ...user }, "asdasdsads");
                result = { token, status: true }
            }

            return result
        },
        register: async (parent, args, context, info) => {
            await userModel.create({ ...args });
            return true
        },
        uploadfile: async (parent, { file, id }, context, info) => {

            const work = await workModel.findById(id).exec();

            for (let n in file) {
                const { createReadStream, filename } = await file[n];
                work.path.push(filename);
                await new Promise(res =>
                    createReadStream()
                        .pipe(createWriteStream(path.join(__dirname, "../upload", filename)))
                        .on("close", res)
                )
            }

            work.status = "success";
            await work.save();

            return true;
        },
        addwork: async (parent, args, context, info) => {
            await workModel.create({ ...args });
            return true
        },
        workme: async (parent, args) => {
            const work = await workModel.findById(args.id).exec();
            work.status = args.status;
            await work.save();
            return true
        },
        deluser: async (parent, { id }) => {
            await workModel.deleteOne({ worker: id }).then( async _ => {
                await userModel.deleteOne({ _id: id }).then( () => {
                });
            });
            return true;
        },
        editprofile: async (_, args) => {

            const user = await userModel.findById(args.id);
            await userModel.updateOne({ _id: args.id }, {
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                phone: args.phone,
                password: args.password? md5(args.password) : user.password 
            }).exec();

            return true;
        }
    }
}