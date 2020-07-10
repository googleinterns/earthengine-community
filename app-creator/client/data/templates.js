import { database } from '../client/fetch-templates';
class TemplatesManager {
    constructor() {
        this.templates = [];
    }
    getTemplates() {
        return this.templates;
    }
    async fetchTemplates(forceReload = false, onError) {
        /**
         * If we have already fetched the templates, then
         * we will just return what we have stored.
         */
        if (this.templates.length > 0) {
            return this.templates;
        }
        try {
            const response = await fetch('/api/v1/templates');
            this.templates = await response.json();
            return this.templates;
        }
        catch (e) {
            /**
             * If a request fails, with the forceReload flag set to true,
             * we will try again one more time.
             */
            if (forceReload) {
                await this.fetchTemplates(false, onError);
            }
            else {
                this.templates = database;
                if (onError != null) {
                    onError();
                }
            }
            return this.templates;
        }
    }
    setTemplates(templates) {
        this.templates = templates;
    }
    addTemplates(templates) {
        this.templates.push(...templates);
    }
}
export const templatesManager = new TemplatesManager();
//# sourceMappingURL=templates.js.map