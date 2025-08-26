import API from '../base/api';

const botAPI = {
    getBots: () => API.get('/bots'),
    addBot: (data, config) => API.post('/bots', data, config),
    startBot: (id) => API.post(`/bots/${id}/start`),
    stopBot: (id) => API.post(`/bots/${id}/stop`),
    deleteBot: (id) => API.delete(`/bots/${id}`),

    updatePrefix: (id, data, config) => API.patch(`/bots/${id}/prefix`, data, config),

    reloadAll: (id) => API.post(`/bots/${id}/reload`),
    reloadPrefixCommands: (id) => API.post(`/bots/${id}/reload/prefix`),
    reloadSlashCommands: (id) => API.post(`/bots/${id}/reload/slash`),
    reloadEvents: (id) => API.post(`/bots/${id}/reload/events`)
};

const botFeatureAPI = {
    getFeatures: () => API.get('/bot-feature'),

    addOneFeature: (data, config) => API.post('/bot-feature/one', data, config),
    addManyFeatures: (data, config) => API.post('/bot-feature/many', data, config),

    updateFeature: (data, config) => API.patch(`/bot-feature`, data, config),
    deleteFeature: (data, config) => API.delete(`/bot-feature`, data, config)
}

const featureAPI = {
    sync: (data, config) => API.post(`/features/sync`, data, config),

    getFeatures: () => API.get('/features'),
    getFeatureById: (panelId) => API.post(`/by`, { panelId }),

    addFeature: (data, config) => API.post(`/features`, data, config),
    updateFeature: (data, config) => API.patch(`/features`, data, config)
}

export {
    botAPI,
    botFeatureAPI,
    featureAPI
}

