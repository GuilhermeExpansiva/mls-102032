/// <mls fileReference="_102032_/l2/plugins/pluginTranslate.ts" enhancement="_102027_enhancementLit"/>

import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_100554_/l2/stateLitElement.js';

/// **collab_i18n_start**
const message_pt = {
    title: 'Configuração do Tradutor',
    project: 'Projeto',
    originFolder: 'Pasta de Origem',
    targetFolder: 'Pasta de Destino',
    originLanguage: 'Idioma de Origem',
    targetLanguage: 'Idioma de Destino',
    excludeFiles: 'Arquivos a Excluir (separados por vírgula)',
    pages: 'Somente Páginas (separadas por vírgula)',
    generatedPrompt: 'Prompt Gerado',
    copy: 'Copiar'
}

const message_en = {
    title: 'Translator Configuration',
    project: 'Project',
    originFolder: 'Origin Folder',
    targetFolder: 'Target Folder',
    originLanguage: 'Origin Language',
    targetLanguage: 'Target Language',
    excludeFiles: 'Exclude Files (comma separated)',
    pages: 'Only Pages (comma separated)',
    generatedPrompt: 'Generated Prompt',
    copy: 'Copy'
}

type MessageType = typeof message_en;

const messages: { [key: string]: MessageType } = {
    'en': message_en,
    'pt': message_pt
}
/// **collab_i18n_end**

@customElement('plugins--plugin-translate-102032')
export class PluginTranslate100554 extends StateLitElement {

    private msg: MessageType = messages['en'];

    @state() project = 102031;
    @state() originFolder = 'www/en';
    @state() targetFolder = 'www/pt';
    @state() originLanguage = 'en';
    @state() targetLanguage = 'pt';

    @state() excludeFiles = '';
    @state() pages = '';

    private generatePrompt() {

        const config: any = {
            targetLanguage: this.targetLanguage,
            targetFolder: this.targetFolder,
            originFolder: this.originFolder,
            originLanguage: this.originLanguage,
            project: Number(this.project)
        };

        if (this.pages.trim()) {
            config.pages = this.pages.split(',').map(v => v.trim());
        } else if (this.excludeFiles.trim()) {
            config.excludeFiles = this.excludeFiles.split(',').map(v => v.trim());
        }

        return `@@agentTextExtractor ${JSON.stringify(config)}`;
    }

    render() {

        const lang = this.getMessageKey(messages);
        this.msg = messages[lang];

        const prompt = this.generatePrompt();

        return html`

        <div class="container">

            <h3>${this.msg.title}</h3>

            <label>${this.msg.project}</label>
            <input type="number"
                .value=${this.project}
                @input=${(e: any) => this.project = e.target.value}>

            <label>${this.msg.originFolder}</label>
            <input
                .value=${this.originFolder}
                @input=${(e: any) => this.originFolder = e.target.value}>

            <label>${this.msg.targetFolder}</label>
            <input
                .value=${this.targetFolder}
                @input=${(e: any) => this.targetFolder = e.target.value}>

            <label>${this.msg.originLanguage}</label>
            <input
                .value=${this.originLanguage}
                @input=${(e: any) => this.originLanguage = e.target.value}>

            <label>${this.msg.targetLanguage}</label>
            <input
                .value=${this.targetLanguage}
                @input=${(e: any) => this.targetLanguage = e.target.value}>

            <label>${this.msg.excludeFiles}</label>
            <input
                .value=${this.excludeFiles}
                @input=${(e: any) => this.excludeFiles = e.target.value}>

            <label>${this.msg.pages}</label>
            <input
                .value=${this.pages}
                @input=${(e: any) => this.pages = e.target.value}>

            <h4>${this.msg.generatedPrompt}</h4>

            <pre>${prompt}</pre>

            <button
                @click=${() => navigator.clipboard.writeText(prompt)}>
                ${this.msg.copy}
            </button>

        </div>

        `;
    }
}