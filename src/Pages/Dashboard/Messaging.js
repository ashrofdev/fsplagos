import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import Bounce from 'react-reveal/Bounce'

const Messaging = () => {
    const [preview, setPreview] = useState(false)
    const [message, setMessage] = useState("")

    const sendMessage = () => {
        const data = `sender=FSP Nigeria&to=08169094945&message=${message}%20SMS&type=0&routing=5&token=ncGtBP4FAd6V5Jv81aoUl7S3sGIVX3e0XaKHGyEvfSifpMnu4IZaHX6FCD0mJbbpN2WUS7xgAC8EDdYis8ZqbhdqdbKAU4z0KV1b`;

        const xhr = new XMLHttpRequest()

        const thisPointer = this
        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            console.log(this.responseType);
            ///hndle response
        }
        });

        xhr.open("POST", "https://smartsmssolutions.com/api/json.php")
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        xhr.send(data)
    }
    return (
        <div className="messaging">
            <header>Messanger</header>
            <div className="body">
                <div>
                    <label>
                        Enter your message below
                        <textarea onChange={(e)=> setMessage(e.target.value)} className="textarea" placeholder="Message"/>
                    </label>
                </div>
                <p>All messages are recorded and will be saved according to the authorized sender</p>
                <div className="cta">
                    <button onClick={()=> setPreview(true)}>Send via SMS</button>
                </div>

                {/* message preview */}
                {
                    preview?
                    <div className="preview">
                        <Bounce center duration={1000}>
                            <div className="previewmodal">
                                <header>
                                    <h4>Preview message</h4>
                                    <button onClick={()=> setPreview(false)}><FontAwesome size="2x" name="times" /></button>
                                </header>
                                <p>{message}</p>
                                <div className="cta">
                                    <button onClick={sendMessage}>Send</button>
                                </div>
                            </div>
                        </Bounce>
                    </div>:null
                }
            </div>
        </div>
    );
};

export default Messaging;