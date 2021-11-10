import React from "react";
import {useHistory} from  "react-router-dom";

const Main = () => {
    const history = useHistory();
    return (
        <div id="wrap" className="login">
            <div className="content">
                <div>
                    <h2>FaChart</h2>
                </div>
                <div className="form-wrap">
                    <div className="form-box">
                        <input
                            type="text"
                            id="user-id"
                            placeholder="ID"
                            className="style-bottom"/>
                    </div>
                    <div className="form-box">
                        <input
                            type="password"
                            id="user-pw"
                            placeholder="Password"
                            className="style-bottom"/>
                    </div>
                    <button onClick={() => {
                        history.push("/Manage")
                    }}>로그인</button>
                </div>
            </div>
        </div>
    );
}

export default Main;