import * as axios from 'axios'

// const token = "eyJhbGc2iOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJmZWRvcm92MTIzQGdtYWlsLmNvbSIsImV4cCI6MTU5MDYxMDYzMiwiaXNzIjoiRGVtb0FwcCIsImF1ZCI6IkRlbW9BcHBDbGllbnQifQ.1nqDAYj0IcVOsgJ7BA41-4ydhNnnkKoygyDE-6yfjrM"
const instanse = axios.create({
    baseURL: 'https://kaf.westeurope.cloudapp.azure.com/',
    withCredentials: true,
})

export const newsAPI = {
    getNews() {
        return instanse.get('News/GetNews')
    },
    addNews(authorId, theme, news_Text, news_Date) {
        return instanse.post('News/AddNews', { authorId, theme, news_Text, news_Date })
    },
    removeNews(id) {
        return instanse.delete(`News/DeleteNews/?id=${id}`)
    },
    updateNews(id, theme, news_Text, news_Date) {
        return instanse.put(`News/UpdateNews`, { id, theme, news_Text, news_Date })
    },
    toggleImportantNews(id, isImportant) {
        return instanse.put(`News/UpdateNewsImportant`, { id, isImportant })
    }
}
export const pollsAPI = {
    getPolls() {
        return instanse.get('Polls/GetPoll')
    },
}
export const forumAPI = {
    getForum() {
        return instanse.get(`Forum/GetForum`)
    },
    addForum(authorId, theme, forumDate) {
        return instanse.post(`Forum/AddForum`, { authorId, theme, forumDate })
    },
    updateForum(id, theme, forumDate) {
        return instanse.put(`/Forum/UpdateForum`, { id, theme, forumDate })
    },
    removeForumPost(id) {
        return instanse.delete(`Forum/DeleteForum/?id=${id}`)
    },
    getForumItem(id) {
        return instanse.get(`/Forum/GetForumById/?id=${id}`)
    },
    addForumMessage(idForum, idAuthor, messageText, messageDate) {
        return instanse.post(`/Forum/AddForumMessage`, { idForum, idAuthor, messageText, messageDate })
    },
    removeForumMessage(id){
        return instanse.delete(`/Forum/DeleteForumMessage/?id=${id}`)   
    }

}
export const authAPI = {
    sendEmail(email,password,fio){
        return instanse.post(`/Auth/SendMail`,{email,password,fio})
    },
    getCode(code){
        return instanse.get(`/Auth/CodeRegistration?code=${code}`)
    },
    login(eMail, password) {
        return instanse.post(`/Auth/Authenticate`, { eMail, password })
    },
    getAuth(token) {
        return instanse.get(`/Auth/Authorization`, { headers: { "Authorization": `Bearer ${token}` } })
    },
}

export const userAPI = {
    getUsers() {
        return instanse.get(`/User/GetUser`)
    },
    updateUserRole(id,userRole){
        return instanse.put(`/User/UpdateRole`,{id,userRole})
    },
    removeUser(id){
        return instanse.delete(`/User/DeleteUser?id=${id}`)
    }
}


