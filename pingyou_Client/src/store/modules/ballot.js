import { get,post, put } from '../../api'

const RELOAD = 'RELOAD'

const state = {
        data: {
                project_detail:{},
                ballot_list: [],
        }
}

const getters = {
        project_detail: state => state.data.project_detail,
        ballot_list: state => state.data.ballot_list
}

const actions = {
        reload ({commit}, data){
                let url = ''
                let { item, params = {} } = data
                switch(item){
                        case 'project_detail': 
                                url = '/project-detail'
                                break
                        case 'ballot':
                                url = '/ballot'
                                break
                        default: 
                                alert('error')
                }
                return new Promise((resolve, reject) => {
                        get(url, params)
                                .then(res => {
                                        commit(RELOAD, {item: item, data: res.data.data})
                                        resolve(res)
                                })
                                .catch(e => {
                                        console.log(e)
                                        reject(e)
                                })
                })
        },
        changeProStatus({commit},data){
                // return new Promise((resolve, reject) => {
                //         put('/project-detail/' + data.pdid, {status: data.status})
                //                 .then(res => {
                //                         resolve(res)
                //                 })
                //                 .catch(e => {
                //                         reject(e)
                //                 })
                // })
                return new Promise((resolve, reject) => {
                        post('/start_ballot/' + data.pdid, data)
                                .then(res => {
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        updateBallot({commit}, id){
                return new Promise((resolve, reject) => {
                        put('/ballot/' + id, {})
                                .then(res => {
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        uploadMessage({commit},data){
                console.log(data)
                return new Promise((resolve, reject) => {
                        post('/messages', data)
                                .then(res => {
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        }
}

const mutations = {
        [RELOAD] (state, {item, data}){
                if (item === 'project_detail' ){
                        state.data.project_detail= data.list[0]
                } else if(item == 'ballot') {
                        state.data.ballot_list = data
                }
                
        }
}

export default {
        namespaced: true,
        state,
        getters,
        actions,
        mutations
}