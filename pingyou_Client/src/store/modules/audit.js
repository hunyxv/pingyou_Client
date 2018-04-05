import { get,post, put } from '../../api'

const RELOAD = 'RELOAD'
const GETMESSAGES = 'GETMESSAGES'
const GETBALLOTS = 'GETBALLOT'

const state = {
        data: {
                project_detail_list:[],
                ballot_list: [],
                messages:[],
        },
        status: {
                project_detail: {
                        count: '',
                        page_sum: '',
                        current_page: '',
                        has_previous: '',
                        has_next: '',
                        item:''
                },
        },
}

const getters = {
        project_detail_list: state => state.data.project_detail_list,
        ballot_list: state => state.data.ballot_list,
        messages: state => state.data.messages,
        status:  state => state.status
}

const actions = {
        reload ({commit}, data){
                let url = ''
                let { item, params = {} } = data
                switch(item){
                        case 'project_detail': 
                                url = '/project-detail?page_size=3'
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
        downloadMessages({commit}, data){
                return new Promise((resolve, reject) => {
                        get('/messages',{pdid: data.id})
                                .then(res => {
                                        commit(GETMESSAGES, res.data.data)
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        getBallot({commit}, data){
                return new Promise((resolve, reject) => {
                        get('/ballot', {pdid: data.id})
                                .then(res => {
                                        commit(GETBALLOTS, res.data.data)
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        getXClassUser({commit}, data){
                return new Promise((resolve, reject) => {
                        get('/user')
                })
        }
}

const mutations = {
        [RELOAD] (state, {item, data}){
                if (item === 'project_detail' ){
                        state.data.project_detail_list= data.list
                        if ( state.data.project_detail){
                                let create_date = new Date(state.data.project_detail.create_date * 1000)
                                state.data.project_detail.create_date = create_date.toLocaleString()
                        }
                        state.status.project_detail.count = data.count
                        state.status.project_detail.page_sum = data.page_sum
                        state.status.project_detail.current_page = data.current_page
                        state.status.project_detail.has_previous = data.has_previous
                        state.status.project_detail.has_next = data.has_next
                        state.status.project_detail.item = item
                } else if(item == 'ballot') {
                        state.data.ballot_list = data
                }
        },
        [GETMESSAGES] (state,  data){
                 state.data.messages = data
        },
        [GETBALLOTS](state, data){
                        state.data.ballot_list = data
        }
}

export default {
        namespaced: true,
        state,
        getters,
        actions,
        mutations
}