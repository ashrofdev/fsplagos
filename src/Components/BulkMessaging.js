import React from 'react';
import Bounce from 'react-reveal/Bounce'

const BulkMessaging = () => {
    return (
        <Bounce top>
            <div className="bulkmessaging">
                <h3>Messanger</h3>
                <div className="bodyy">
                    <select>
                        <option value="all">All</option>
                        <option value="Stage1">Stage1</option>
                        <option value="Stage2">Stage2</option>
                        <option value="Stage3">Stage3</option>
                        <option value="Stage4">Stage4</option>
                        <option value="Stage5">Stage5</option>
                        <option value="Stage6">Stage6</option>
                        <option value="Stage7">Stage7</option>
                        <option value="Stage8">Stage8</option>
                    </select>
                    <textarea></textarea>
                    <div className="cta">
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </Bounce>
    );
};

export default BulkMessaging;