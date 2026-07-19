const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwKMKvT-0CZLIELoEd84hGkv3wIJTnMp7UpnZugwLLsiYed5NdWdqHeK8HHzu4Ou0WcTg/exec';

const LocalCache = {
    KEY: 'dashboard_history_cache',
    TTL: 1000 * 60 * 10,

    get() {
        const rawData = localStorage.getItem(this.KEY);
        if (!rawData) return null;
        try {
            const cache = JSON.parse(rawData);
            return cache.data;
        } catch (e) {
            this.clear();
            return null;
        }
    },

    set(logsArray) {
        const cacheObject = { timestamp: Date.now(), data: logsArray };
        localStorage.setItem(this.KEY, JSON.stringify(cacheObject));
    },

    clear() {
        localStorage.removeItem(this.KEY);
    }
};

export const DataService = {
    async fetchHistory() {
        let logs = LocalCache.get();
        if (logs) return logs;

        try {
            const response = await fetch(APPS_SCRIPT_URL, { method: 'GET', mode: 'cors' });
            const data = await response.json();
            const logData = Array.isArray(data) ? data : (data.data || []);
            LocalCache.set(logData);
            return logData;
        } catch (error) {
            console.error("Failed fetching database logs:", error);
            return null;
        }
    },

    async saveEntry(id, score, note, isStrenuous) {
        LocalCache.clear();
        const payload = { timestamp: new Date().toISOString(), id, score, note, isStrenuous };

        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            return result.status === "success";
        } catch (error) {
            console.error("Network failure pushing log entry:", error);
            return false;
        }
    }
};
