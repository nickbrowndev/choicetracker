const SUBMISSION_URL = 'https://script.google.com/macros/s/AKfycbwKMKvT-0CZLIELoEd84hGkv3wIJTnMp7UpnZugwLLsiYed5NdWdqHeK8HHzu4Ou0WcTg/exec';
const RETRIEVAL_URL = 'https://api.sheety.co/133b32e7a990e2ebc6f2c10d5797c26f/behaviourTracker/logs';

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
    /**
     * This will return all rows from the spreadsheet. The values must be filtered 
     * from this data set manually.
     *
     * To add restrictions to the query, the spreadsheet must be changed to have a
     * QUERY formula applied, and sheety point at that worksheet instead.
     */
    async fetchHistory() {
        let logs = LocalCache.get();
        if (logs) return logs;

        try {
            const response = await fetch(RETRIEVAL_URL, { method: 'GET', mode: 'cors' });
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
        const payload = { timestamp: Temporal.Now.instant().toString(), id, score, note, isStrenuous };

        try {
            const response = await fetch(SUBMISSION_URL, {
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
