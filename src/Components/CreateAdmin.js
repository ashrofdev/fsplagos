import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'
import { PrimaryBtn } from './Btns';
import { firebaseDB, firebaseAuth} from '../firebase'

class CreateAdmin extends Component {

    state = {
        accountType: 'readonly',
        isLoading: false,
    }

    createAdmin = (e) => {
        e.preventDefault()
        this.setState({isLoading: true})
        const admin = {
            name: e.target.fullname.value,
            email: e.target.email.value,
            username: e.target.username.value,
            accountType: e.target.accountType.value,
        }

        firebaseAuth.createUserWithEmailAndPassword(admin.email, e.target.password.value).then(e=>{

            firebaseDB.ref().child('admins').push(admin).then(()=>{
                this.setState({isLoading: false})
                this.props.alert('positive', 'Admin created successfully')

            }).catch((e)=>{
                this.setState({isLoading: false})
                this.props.alert('negative', 'Admin not created')

            })
        }).catch(e=>{
            this.setState({isLoading: false})
            this.props.alert('negative', e.message)
        })
        
    }
    render() {
        console.log(this.state.accountType)
        return (
            <Fade>
                <div className="create_admin">
                    <h2 className="heading2">Create new Admin</h2>
                    <form className="form" onSubmit={this.createAdmin}>
                        <input name="fullname" required placeholder="Full name"/>
                        <input name="email" required placeholder="Email address" type="email"/>
                        <input name="username" required placeholder="Username"/>
                        <label>
                            Account type
                            <select name="accountType" required onChange={(e)=> this.setState({accountType: e.target.value})}>
                                <option value="readonly">Read only</option>
                                <option value="readandwrite">Read and write</option>
                            </select>
                        </label>
                        <input name="password" required placeholder="Password" type="password"/>
                        {
                            this.state.accountType==='readonly'?
                            <p>A read only account will not have access to admin features</p>:
                            <p style={{color:'rgb(255, 51, 0)'}}>A Read and write account will have access to all admin features including updating
                                investors progress.
                            </p>
                        }
                        <div className="cta">
                            <PrimaryBtn title={'Create account'}/>
                            {
                                this.state.isLoading?
                                <img className="loader" src={require('../img/loader.jpeg')}/>:null
                            }
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default CreateAdmin;