import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth/";

class authService {

    async login(username, password){
        const response = await axios.post(API_URL + "signin", {
            username,
            password
        });
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout(){
        localStorage.removeItem("user");
        window.location.href = '/login';
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

}
// eslint-disable-next-line
export default new authService();
