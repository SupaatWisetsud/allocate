import mysql from 'mysql'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_allocate"
});
db.connect(err => { if (err) throw err });

const resolvers = {
    Query: {
        newfeeds: async (parent, args, context, info) => {
            
            let sql = `SELECT * FROM tb_work
            INNER JOIN tb_member ON tb_work.w_worker = tb_member.m_id
            WHERE w_status NOT IN('send') ORDER BY tb_work.w_datestatus desc`;
            let result = [];
            await new Promise((resolve, reject) => {
                db.query(sql, (err, row) => {
                    if (err) throw err;
                    result = row;
                    resolve();
                })
            })

            return result
        },
        users: async () => {
            let sql = `SELECT * FROM tb_member`;
            let result = [];
            await new Promise((resolve, reject) => {
                db.query(sql, (err, row) => {
                    if (err) throw err;
                    result = row;
                    resolve();
                })
            });
            return result;
        },
        report: async () => {
            let sql = `SELECT * FROM tb_work
                    INNER JOIN tb_member ON tb_work.w_worker = tb_member.m_id
                    WHERE w_status = 'success' `
            let result = [];
            await new Promise((resolve, reject) => {
                db.query(sql, (err, row) => {
                    if (err) throw err;
                    result = row;
                    resolve();
                })
            });
            return result;
        },
        workme: async (parent, args, context, info) => {
            let sql = `SELECT * FROM tb_work 
                    INNER JOIN tb_member ON tb_work.w_commander = tb_member.m_id
                    WHERE tb_work.w_worker = '${args.id}' AND w_status = 'send' `
            let result = [];
            await new Promise((resolve, reject) => {
                db.query(sql, (err, row) => {
                    if (err) throw err;
                    result = row;
                    resolve();
                })
            });
            return result;
        },
        workorder: async (parent, args, context, info) => {
            let sql = `SELECT * FROM tb_work
            INNER JOIN tb_member ON tb_work.w_worker = tb_member.m_id
            WHERE tb_work.w_commander = '${args.id}' `;
            let result = [];
            await new Promise((resolve, reject) => {
                db.query(sql, (err, row) => {
                    if (err) throw err;
                    result = row;
                    resolve();
                })
            });
            return result;
        }
    },
    Mutation: {
        login: async (parent, { username, password }, context, info) => {

            let sql = `SELECT * FROM tb_member WHERE m_username = '${username}' AND m_password = '${md5(password)}' `;
            let result = {token:null, status: false};
            
            await new Promise((resolve, reject) => {
                db.query(sql, async (err, row) => {
                    if (err) throw err;
                    if (row[0] !== undefined) {
                        const token = await jwt.sign({ ...row }, "asdasdsads");
                        result = { token, status: true}
                    } else {
                        result = { token: null , status: false}
                    }
                    resolve();
                })
            });
            
            return result
        }
    }
}
export default resolvers