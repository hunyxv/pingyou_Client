// const BASE_URL = 'http://api.crm.geeks.vc'
// const BASE_URL = 'http://67.209.191.77:8000'
const BASE_URL = 'http://127.0.0.1:5000'
const VERSION = '/api/v1'

export const config = {
        url: {
                apiAdress: BASE_URL,
                baseUrl: BASE_URL + VERSION,
                login: '/login',
                user: '/user',
                me: '/user/me',
                department: '/departmet',
                project_detail: '/project-detail',
                class: '/class',
                project: '/project',
                statistics:'/statistics'
        },
}