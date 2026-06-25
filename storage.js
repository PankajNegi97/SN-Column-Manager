const Storage = {

    async getProfiles() {

        const result = await chrome.storage.local.get("profiles");
        return result.profiles || {};

    },

    async saveProfile(name, columns) {

        const profiles = await this.getProfiles();

        profiles[name] = columns;

        await chrome.storage.local.set({
            profiles
        });

    },

    async deleteProfile(name) {

        const profiles = await this.getProfiles();

        delete profiles[name];

        await chrome.storage.local.set({
            profiles
        });

    }

};