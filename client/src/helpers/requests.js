// requests
import API from '../base/api';


const botAPI = {
    bots: () => API.get('/bots'),
    addBot: (data, config) => API.post('/bots', data, config),
    startBot: (id) => API.post(`/bots/${id}/start`),
    stopBot: (id) => API.post(`/bots/${id}/stop`),
    deleteBot: (id) => API.delete(`/bots/${id}`),

    updatePrefix: (id, data, config) => API.patch(`/bots/${id}/prefix`, data, config),
    
    reloadAll: (id) => API.post(`/bots/${id}/reload`),
    reloadPrefixCommands: (id) => API.post(`/bots/${id}/reload/prefix`),
    reloadSlashCommands: (id) => API.post(`/bots/${id}/reload/slash`),
    reloadEvents: (id) => API.post(`/bots/${id}/reload/events`),
};


