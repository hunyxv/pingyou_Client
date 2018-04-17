import { get,post, delete_ } from '../../api'

const RELOAD = 'RELOAD'

const state = {
        data: {
                project_detail_list: [],
                project_list : [],
                class_list : [],
                department_list: [],
        },
        status: {
                item: 'all',
                project_detail: {
                        count: 0,
                        page_sum: '',
                        current_page: '',
                        has_previous: '',
                        has_next: '',
                        item:''
                },
                customerOption:'all',
        }
}

const getters = {
        state: state => state,
        item: state=>state.data.item,
        project_detail_list: state => state.data.project_detail_list,
        project_list: state => state.data.project_list,
        class_list: state => state.data.class_list,
        department_list: state  => state.data.department_list,
        status: state => state.status
}

const actions = {
        reload ({commit}, data){
                let url = ''
                let { item, params = {} } = data
                if (params.item === 'all'){
                        state.status.item = 'all'
                }else{
                        state.status.item = 'my'
                }
                
                switch(item){
                        case 'project-detail': 
                                url = '/stat?status=3'
                                break
                        case 'project': 
                                url = '/project'
                                break
                        case 'department':
                                url = '/department?item=all'
                                break
                        case 'class':
                                url = '/class'
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

}

const mutations = {
        [RELOAD] (state, {item, data}){
                if (item === 'project-detail' ){
                        state.data.project_detail_list = data
                }else if (item === 'project'){
                        state.data.project_list=data
                }else if (item === 'class'){
                        state.data.class_list = data
                }else if (item === 'department'){
                        state.data.department_list = data
                }else if (item === 'Counselor'){
                        state.status.newStatus = true
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