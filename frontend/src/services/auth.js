import ApiService from './api.service'
// import objectToFormData from 'object-to-formdata'
import { content_types, auth_header } from './../utils'

const api = new ApiService()
export const loginApi = async (loginData) => {
  return await api.postApi('v1/user/login', loginData, {
    ...content_types.json,
  })
}

export const signupApi = async (signupData) => {
  return await api.postApi('v1/user/signup', signupData, {
    ...content_types.json,
  })
}

export const forgetPasswordApi = async (forgetPasswordData) => {
  return await api.postApi('v1/user/forgot-password', forgetPasswordData, {
    ...content_types.json,
  })
}
