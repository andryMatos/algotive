import { useState } from "react";
import authService from '../services/auth-services';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    const handleSubmit = () => {
        authService.login(username, password)
            .then(
                () => {
                    history('/dashboard');
                    window.location.reload();
                },
                error => {
                    // eslint-disable-next-line
                    const messageError = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) || error.message || error.toString();
                }
            )
    }


    return(
        <>
            <div className="container center-elements">
                <div className="row">
                    <div className="text-center">
                            <div className="form-group mb-4 mt-4">
                                <label className="label-input mb-1">username</label>
                                <input
                                    className="form-control"
                                    id="username" name="username"
                                    type="text"
                                    placeholder="username"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group mb-4 mt-4">
                                <label className="label-input mb-1">password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="***********"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button className="btn btn-primary" onClick={handleSubmit}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;