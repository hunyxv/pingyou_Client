import { get,post, delete_, put } from '../../api'

const RELOAD = 'RELOAD'
const RESET_USER_LIST = 'RESET_USER_LIST'

const state = {
        data:{
                user_list:[],
                me:{},
                class_list : [],
                department_list: [],
        },
        status:{
                update:{},
                myInfo: true,
                change: true
        }
}

const getters = {
        state: state => state,
        me: state => state.data.me,
        user_list: state => state.data.user_list,
        class_list: state => state.data.class_list,
        department_list: state => state.data.department_list,
        status: state =>  state.status
}

const actions = {
        reload ({commit}, data){
                let url = ''
                let { item, params = {} } = data
                
                switch(item){
                        case 'all': 
                                url = '/user'
                                break
                        case 'me': 
                                url = '/user/me'
                                break
                        case 'department':
                                url = '/department'
                                break
                        case 'class':
                                url = '/class'
                                break
                        // case 'one':
                        //         url = '/user/' + params.id
                        //         break
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
        updateInfo({commit}, data){
                let item = data.id
                return new Promise((resolve, reject) => {
                        put('/user/'+ item, data.data)
                                .then(res => {
                                        commit(RESET_USER_LIST, {item, data})
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        createUser({commit},data){
                return new Promise((resolve, reject) => {
                        post('/user/'+ data.id, data.data)
                                .then(res => {
                                        commit(RESET_USER_LIST, {item: data.id, data: res.data.data})
                                        resolve(res)
                                })
                                .catch(e =>{
                                        reject(e)
                                })
                })
        },
        deleteUser({commit},data){
                return new Promise((resolve, reject) => {
                        delete_('/user/' + data.id)
                                .then(res => {
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        sendCode({commit}){
                return new Promise((resolve, reject) => {
                        get('/sendcode', {})
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
                if (item ==='all'){
                        state.data.user_list = data
                }else if(item === 'me'){
                        state.data.me = data
                }else if(item === 'class'){
                        state.data.class_list = data
                }else if(item === 'department'){
                        state.data.department_list = data
                }
        },
        [RESET_USER_LIST] (state, {item, data}){
                if (item === 'all'){
                        state.data.user_list = [...state.data.user_list, ...data]
                } else if (item === 'one') {
                        state.data.user_list[data.index] = data
                } else if(item === 'me'){
                        state.me = data
                }
        }
}

export default {
        namespaced :true,
        state,
        getters,
        actions,
        mutations
}
