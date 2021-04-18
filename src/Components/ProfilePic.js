import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { firebaseDB, firebaseStorage } from '../firebase';

class ProfilePic extends Component {
    state={
        url: '',
        isLoading: true
    }
    componentDidMount(){
        if (this.props.user.key){
            firebaseDB.ref('investors').child(this.props.user.key).on('value', e=>{
                this.setState({
                    url: e.val().url,
                    isLoading: false
                })
    
            })
        }
    }

    checkFile = (file) => {
        const img = file.target.files[0]
        if(img.type.includes('image') && img.size <= 1000000){
            this.uploadPic(file)
        } else if (img.size > 1000000){
            this.props.alert('negative', "Sorry, you can only upload images of 1MB or less")
        } else {
            this.props.alert('negative', "Wrong file type, try uploading an image")
        }

    }

    uploadPic = (file) => {
        const img = file.target.files[0]

        this.setState({isLoading: true})

        firebaseStorage.ref('investors').child(this.props.user.key).put(img).then(()=>{
            firebaseStorage.ref('investors').child(this.props.user.key).getDownloadURL().then(url=>{
                firebaseDB.ref('investors').child(this.props.user.key).update({ url })
                this.props.alert('positive', 'Upload successful')
                this.setState({isLoading: false})
            }).catch(e=>{
                this.props.alert('negative', e.message)

            })
        }).catch(e=>{
            this.props.alert('negative', e.message)
        })
    }
    render() {
        return (
            <div className="pic">
                <label>
                    <FontAwesome className="font" name="camera" size="2x"/>
                    <input onChange={this.checkFile} type="file"/>
                </label>
                {
                    this.state.isLoading?

                    <img className="loader" src={require('../img/loader.jpeg')}/>
                    :
                    this.state.url?
                    <img src={this.state.url}/>:
                    <img src={require('../img/default.png')}/>
                }
            </div>
        );
    }
}

export default ProfilePic;