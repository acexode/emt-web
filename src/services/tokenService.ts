// import jwt_decode from "jwt-decode";

class TokenService {
    getToken() {
        return localStorage.getItem("token");
    }
    getUser() {
        return JSON.parse(<string>localStorage.getItem("user"))
        // const token = this.getToken();
        // if (token) {
        //     return jwt_decode(token);
        // }
    }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }
    setUser(user: any){
        localStorage.setItem("user",user)
    }
    removeToken() {
        localStorage.removeItem("token");
    }

    clearStorage() {
        localStorage.clear();
    }
}

export default new TokenService();
