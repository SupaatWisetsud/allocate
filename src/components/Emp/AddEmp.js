import React from 'react'

class AddEmp extends React.Component {
    render() {

        const { classes, toggle } = this.props;

        return (
            <React.Fragment>
                <div className={classes.wrapper}>
                    <header className={classes.title}>
                        <button onClick={toggle} >กลับ</button>
                        <span>เพิ่มพนักงาน</span>
                    </header>
                    <div className={classes.form}>
                        <form>
                            <div className={classes.items}>
                                <input type="text" placeholder="Username" />
                            </div>
                            <div className={classes.items}>
                                <input type="password" placeholder="Password" />
                            </div>
                            <div className={classes.items}>
                                <input type="password" placeholder="Confrim Password" />
                            </div>
                            <div className={classes.items2}>
                                <input type="text" placeholder="First Name" />
                                <input type="text" placeholder="Last Name" />
                            </div>
                            <div className={classes.items}>
                                <input type="email"  placeholder="Email" />
                            </div>
                            <div className={classes.items}>
                                <select name="status">
                                    <option value="user" >พนักงาน</option>
                                    <option value="admin">ผู้ดูแล</option>
                                </select>
                            </div>
                            <div className={classes.items}>
                                <input type="file" />
                            </div>
                            <div className={classes.items}>
                                <input type="number" placeholder="Number Phone" />
                            </div>
                            <div className={classes.items}>
                                <button name="submit">ตกลง</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AddEmp