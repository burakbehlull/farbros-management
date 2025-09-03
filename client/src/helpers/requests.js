import API from '../base/api';

const botAPI = {
    getBots: () => API.get('/bots'),
    addBot: (data, config) => API.post('/bots', data, config),
    startBot: (id, data) => API.post(`/bots/${id}/start`, data),
    stopBot: (id, data) => API.post(`/bots/${id}/stop`, data),
    deleteBot: (id) => API.delete(`/bots/${id}`),

    getBotById: (id) => API.get(`/bots/${id}`),

    updatePrefix: (id, data, config) => API.patch(`/bots/${id}/prefix`, data, config),

    updateBotInfo: (id, data, config) => API.put(`/bots/${id}`, data, config),
    botIsStatusById: (id, data, config) => API.get(`/bots/${id}/status`, data, config),

    reloadAll: (id) => API.post(`/bots/${id}/reload`),
    reloadPrefixCommands: (id) => API.post(`/bots/${id}/reload/prefix`),
    reloadSlashCommands: (id) => API.post(`/bots/${id}/reload/slash`),
    reloadEvents: (id) => API.post(`/bots/${id}/reload/events`)
};

const botFeatureAPI = {
    getFeatures: (botId, page, limit, config) => API.get('/bot-feature', { botId, page, limit }, config),

    addOneFeature: (data, config) => API.post('/bot-feature/one', data, config),
    addManyFeatures: (data, config) => API.post('/bot-feature/many', data, config),

    updateBotFeatureStatus: (data, config) => API.patch(`/bot-feature/`, data, config),
    deleteFeature: (data, config) => API.delete(`/bot-feature`, data, config)
}

const featureAPI = {
    sync: (data, config) => API.post(`/features/sync`, data, config),

    getFeatures: (page, limit) => API.get('/features', { page, limit }),
    getFeatureById: (panelId) => API.post(`/by`, { panelId }),

    addFeature: (data, config) => API.post(`/features`, data, config),
    updateFeature: (data, config) => API.patch(`/features`, data, config)
}

const userAPI = {
    createUser: (data, config) => API.post('/user/', data, config),

    getUser: (id, config) => API.get(`/user/${id}`, config),
    updateUser: (id, data, config) => API.put(`/user/${id}`, data, config),
    deleteUser: (id, config) => API.delete(`/user/${id}`, config),

    register: (data, config) => API.post('/user/register', data, config),
    login: (data, config) => API.post('/user/login', data, config),

    getUserBots: (userId) => API.get(`/user/${userId}/bots`)

}

export {
    botAPI,
    botFeatureAPI,
    featureAPI,
    userAPI
}

