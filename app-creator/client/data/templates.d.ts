import { TemplateItem } from '../client/fetch-templates';
declare class TemplatesManager {
    private templates;
    getTemplates(): TemplateItem[];
    fetchTemplates(forceReload?: boolean, onError?: () => void): Promise<TemplateItem[]>;
    setTemplates(templates: TemplateItem[]): void;
    addTemplates(templates: TemplateItem[]): void;
}
export declare const templatesManager: TemplatesManager;
export {};
//# sourceMappingURL=templates.d.ts.map