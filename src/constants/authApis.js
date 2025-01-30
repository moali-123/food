import instance from "./baseInstance";

export const login = (data) => {
    return instance.post('Users/Login' , data)
}

// export const register = (data) => {
//     return instance.post('Account/JobSeekerRegister' , data)
// }

// export const recRegister = (data) => {
//     return instance.post('Account/RecRegister' , data)
// }

// export const resendOtp = (data) => {
//     return instance.post('Account/ResendOtp' ,data)
// }

// export const forgotPassword = (data) => {
//     return instance.get(`Account/ForgetPassword?email=${data.email}`)
// }

// export const resetPassword = (data) => {
//     return instance.post(`Account/ResetPassword` , data)
// }