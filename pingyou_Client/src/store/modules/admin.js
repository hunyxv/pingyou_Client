import { get,post, put} from '../../api'
import { stat } from 'fs';

const RELOAD = 'RELOAD'

const state = {
        data: {
                projectList: [],
                classList : [],
                departmentList: [],
                counselorList : [],
        },
        status: {
               
        }
}

const getters = {
        state: state => state,
        projectList: state => state.data.projectList,
        classList: state => state.data.classList,
        departmentList: state  => state.data.departmentList,
        counselorList: state => state.data.counselorList,
        status: state => state.status
}

const actions = {
        reload ({commit}, data){
                let url = ''
                let { item, params = {} } = data
                
                switch(item){
                        case 'project': 
                                url = '/project'
                                break
                        case 'department':
                                url = '/department'
                                break
                        case 'class':
                                url = '/class'
                                break
                        case 'user':
                                url = '/user'
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
        addData({commit}, datas){
                let url = ''
                let { item, data = {} } = datas
                
                switch(item){
                        case 'project': 
                                url = '/project'
                                break
                        case 'department':
                                url = '/department'
                                break
                        case 'class':
                                url = '/class'
                                break
                        case 'user':
                                url = '/user'
                                break
                        default: 
                                alert('error')
                }
                return new Promise((resolve, reject) => {
                        post(url, data)
                                .then(res => {
                                        //commit(RELOAD, {item: item, data: res.data.data})
                                        resolve(res)
                                })
                                .catch(e => {
                                        reject(e)
                                })
                })
        },
        updateData({commit}, datas){
                let url = ''
                let { item, data = {} } = datas
                
                switch(item){
                        case 'project': 
                                url = '/project/' + data.id
                                break
                        case 'department':
                                url = '/department/' + data.id
                                break
                        case 'class':
                                url = '/class/' + data.id
                                break
                        case 'user':
                                url = '/user/' + data.id
                                break
                        default: 
                                alert('error')
                }
                return new Promise((resolve, reject) => {
                        put(url, data)
                                .then(res => {
                                        //commit(RELOAD, {item: item, data: res.data.data})
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
                if (item === 'project'){
                        state.data.projectList=data
                }else if (item === 'class'){
                        state.data.classList= data
                }else if (item === 'department'){
                        state.data.departmentList= data
                }else if (item === 'user'){
                        state.data.counselorList = data
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
