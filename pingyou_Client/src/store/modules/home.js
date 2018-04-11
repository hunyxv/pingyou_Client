import { get,post, delete_ } from '../../api'

const RELOAD = 'RELOAD'

const state = {
        data: {
                project_detail_list: [],
                project_list : [],
                class_list : [],
                department_list: [],
                news :  '',
                user:[],
                wechat_list: []
        },
        status: {
                project_detail: {
                        count: 0,
                        page_sum: '',
                        current_page: '',
                        has_previous: '',
                        has_next: '',
                        item:''
                },
                wechat: {
                        count: 0,
                        page_sum: '',
                        current_page: '',
                        has_previous: '',
                        has_next: '',
                        item:''
                },
                newStatus: false,
        }
}

const getters = {
        state: state => state,
        project_detail_list: state => state.data.project_detail_list,
        project_list: state => state.data.project_list,
        class_list: state => state.data.class_list,
        department_list: state  => state.data.department_list,
        news: state => state.data.news,
        user: state => state.data.user,
        wechat_list: state => state.data.wechat_list,
        status: state => state.status
}

const actions = {
        reload ({commit}, data){
                let url = ''
                let { item, params = {} } = data
                
                switch(item){
                        case 'project_detail': 
                                url = '/project-detail?page_size=8'
                                break
                        case 'project': 
                                url = '/project'
                                break
                        case 'department':
                                url = '/department'
                                break
                        case 'class':
                                url = '/class'
                                break
                        case 'news':
                                url = '/news'
                                break
                        case "wechat":
                                url = '/wechat?page_size=4'
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
        addProjectDetail({commit}, data){
                let project_detail = data
                return new Promise((resolve, reject) => {
                        post('/project-detail', project_detail)
                                .then(res => {
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        deleteProjectDetail({commit}, data){
                let id = data.id
                return new Promise((resolve, reject) => {
                        delete_('/project-detail/' + id )
                                .then(res => {
                                        console.log('delete success')
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                 })
        },
        editNews({ commit }, data){
                let news = data.news
                return new Promise((resolve, reject) => {
                        post('/news',{news: news})
                                .then(res => {
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        applyPeojectDetail({commit}, pro){
                return new Promise((resolve, reject) =>{
                        post('/ballot', {pdid: pro.id})
                                .then(res => {
                                        resolve(res)
                                })
                                .catch(e =>{
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
                if (item === 'project_detail' ){
                        state.data.project_detail_list = data.list
                        state.status.project_detail.count = data.count
                        state.status.project_detail.page_sum = data.page_sum
                        state.status.project_detail.current_page = data.current_page
                        state.status.project_detail.has_previous = data.has_previous
                        state.status.project_detail.has_next = data.has_next
                        state.status.project_detail.item = item
                }else if (item === 'project'){
                        state.data.project_list=data
                }else if (item === 'class'){
                        state.data.class_list = data
                }else if (item === 'department'){
                        state.data.department_list = data
                }else if (item === 'news'){
                        state.data.news = data
                }else if (item === 'Counselor'){
                        state.status.newStatus = true
                }else if(item === 'wechat'){
                        state.data.wechat_list = data.list
                        state.status.wechat.count = data.count
                        state.status.wechat.page_sum = data.page_sum
                        state.status.wechat.current_page = data.current_page
                        state.status.wechat.has_previous = data.has_previous
                        state.status.wechat.has_next = data.has_next
                        state.status.wechat.item = item
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
