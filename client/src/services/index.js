import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
})

export default {
    signin (id_token) {
        return api.post('/signins',{}, {
            headers: { 'Authorization': 'Basic ' + id_token }
        })
    },
    register (data, id_token) {
        return api.post('/registers', data, {
            headers: { 'Authorization': 'Basic ' + id_token }
        })
    },
    listUsers () {
        return api.get('/admins/users')
    },
    approveUser (uid, data) {
        return api.patch('/admins/users/' + uid + '/approve', data)
    },
    deleteUser (uid) {
        return api.delete('/admins/users/' + uid)
    },
    getSubjects () {
        return api.get('/subjects/')
    },
    createSubject (name) {
        return api.post('/subjects', { name: name })
    },
    updateSubject (sid, name) {
        return api.patch('/subjects/' + sid, { name: name })
    },
    deleteSubject (sid) {
        return api.delete('/subjects/' + sid)
    },
    getTopics (sid) {
        return api.get('/subjects/' + sid + '/topics')
    },
    createTopic (sid, topicName) {
        return api.post('/subjects/' + sid + '/topics', { name: topicName })
    },
    updateTopic (sid, tid, topicName) {
        return api.patch('/subjects/' + sid + '/topics/' + tid, { name: topicName })
    },
    deleteTopic (sid, tid) {
        return api.delete('/subjects/' + sid + '/topics/' + tid)
    },
    getQuestions (sid) {
        return api.get('/subjects/' + sid + '/questions')
    },
    createQuestion (sid, data) {
        return api.post('/subjects/' + sid + '/questions', data)
    },
    updateQuestion (sid, qid, data) {
        return api.patch('/subjects/' + sid + '/questions/' + qid, data)
    },
    deleteQuestion (sid, qid) {
        return api.delete('/subjects/' + sid + '/questions/' + qid)
    }
}