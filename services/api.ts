
// import axios from "axios";
import client from "./client"

const API_ENDPOINT_LOGIN = "/auth/signin";
const API_ENDPOINT_SIGNUP = "/auth/signup";
const API_ENDPOINT_VERIFY = "/token/verify";
const API_ENDPOINT_REFRESH = "/token/refresh";
// type AuthType = 'login' | 'signup'
class AuthService {

    // create enum type login or signup
    async doAuth(username: string, password: string, auth: string ): Promise<any> {
        const apiUrl = auth === 'signin' ? API_ENDPOINT_LOGIN : API_ENDPOINT_SIGNUP;
        return client
            .post(apiUrl, {
                username,
                password
            })
            .then(response => {
                console.log("AuthService.login got resp:")
                console.log({ response })
                if (response &&
                    response.data &&
                    response.data.access_token
                    ) {
                    return response.data.access_token
                }
                throw 'token not found'
            })
            .catch(error => {
                console.log("auth.service error obj:")
                console.log({ error })
                let errorMsg: string;
                if (error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.error) {
                    errorMsg = error.response.data.error
                } else if (error && error.message) {
                    errorMsg = error.message
                } else {
                    errorMsg = "Error, try again later"
                }
                console.log("auth.service error msg:" + errorMsg)
                throw errorMsg
            });
    }

    // doSignup(username: string, email: string, password: string) {
    //     return client.post(API_ENDPOINT_SIGNUP, {
    //         username,
    //         email,
    //         password
    //     });
    // }
}

export default new AuthService();
