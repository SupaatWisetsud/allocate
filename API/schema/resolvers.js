import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { createWriteStream } from 'fs'
import path from 'path'
import { GraphQLDateTime } from 'graphql-iso-date'
import { userModel, workModel } from '../model'

const resolvers = {
    Date: GraphQLDateTime,
    Query: {
        newfeeds: async (parent, args, context, info) => {
            
            const work = await workModel.find({})
                        .nor([{status: "send"}])
                        .populate("worker")
                        .populate("commander")
                        .exec();

            return work
        },
        users: async () => await userModel.find({status: "user"}, "-password").exec(),
        report: async () => await workModel.find({status: "success"}).populate("worker").exec(),
        workme: async (parent, {id, status}) =>await workModel.find({worker: id, status}).populate('commander').populate('worker').exec(),
        workorder: async (parent, {id}, context, info) => await workModel.find({commander : id}).populate("commander").exec()
    },
    Mutation: {
        login: async (parent, { username, password }, context, info) => {

            let result = {token:null, status: false};

            const user = await userModel.findOne({
                username: username,
                password: md5(password)
            }, "-password").exec();
           
            if(user !== null){
                const token = await jwt.sign({ ...user }, "asdasdsads");
                result = { token, status: true}
            }
            
            return result
        },
        register: async (parent, args, context, info) => {
            if(!args.img){
                await userModel.create({...args});
            }else{
                 // await userModel.create({...args, file: `/img/user/${args.img.filename}`});
            }
            return true

        },
        uploadfile: async (parent,  { file, id }, context, info) => {
            
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
            await workModel.create({...args});
            return true
        },
        workme: async (parent, args) => {
            const work = await workModel.findById(args.id).exec();
            work.status = args.status;
            await work.save();
            return true
        }
    }
}
export default resolvers