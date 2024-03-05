import axios from "axios"

export const sendEmailVerificationCode = async ( email: string ) => {
    const data = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/sendcode", { email });
    return data.data;
}

export const checkVerificationCode = async ( email: string, code: string ) => {
    const data = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/checkcode", { email, code });
    return data.data;
}

export const checkUser = async ( email: string, username: string ) => {
    const data = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/checkuser", {
        email, username
    });
    return data.data;
}

export const signUp = async ( email: string, username: string, password: string ) => {
    const data = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signup", {
        email, username, password
    });
    return data.data;
}

export const login = async ( userid: string, password: string ) => {
    const data = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
        userid, password
    });
    return data.data;
}