import axios from "axios";

export const sendContactMail = (body) => axios.post("/mail/sendContact", body)

export const addToNewsletter = (body) => axios.post('/newsletter/addToList', body)
export const removeFromNewsletterList = (body) => axios.post('/newsletter/unsubscribe', body)