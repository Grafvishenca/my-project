import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DOMWindow, JSDOM } from 'jsdom';
import webpack from 'webpack';

const FORM_ACTION = 'https://cryp.im/leads';
const FLOW_HASH_VALUE = '{flow_hash}';
const LANDING_VALUE = '{landing}';
const PIXEL_VALUE = '{facebook_pixel_id}';

class TransformToWebmasterLandingPlugin {
    window: DOMWindow;
    document: HTMLDocument;

    constructor() {
        this.window = new JSDOM('', { includeNodeLocations: true }).window;
        this.document = this.window.document;
    }

    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            console.log('The transform to webmaster landing is starting a new compilation...');

            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
                this.constructor.name,
                (data, callback) => {
                    this.document.write(data.html);

                    const html = this.document.querySelector('html') as HTMLHtmlElement;

                    this.removeHandlebarsScript(html);
                    this.createHiddenInputs(html);
                    this.changeFormAction(html);

                    data.html = html.innerHTML;

                    callback(null, data);
                }
            );
        });
    }

    removeHandlebarsScript(html: HTMLHtmlElement) {
        const scripts = html.querySelectorAll('script[defer]');

        for (const script of scripts) {
            if (script.innerHTML.includes('window.serverProps')) {
                script.remove();
            }
        }
    }

    createHiddenInputs(html: HTMLHtmlElement) {
        const forms = html.querySelectorAll<HTMLFormElement>('form.signup_form');

        for (const form of forms) {
            form.insertAdjacentElement('beforeend', this.createHiddenInput('flow_hash', FLOW_HASH_VALUE));
            form.insertAdjacentElement('beforeend', this.createHiddenInput('landing', LANDING_VALUE));
            form.insertAdjacentElement('beforeend', this.createHiddenInput('facebook_pixel_id', PIXEL_VALUE));
        }
    }

    changeFormAction(html: HTMLHtmlElement) {
        const forms = html.querySelectorAll<HTMLFormElement>('form.signup_form');

        for (const form of forms) {
            form.action = FORM_ACTION;
        }
    }

    private createHiddenInput(name: string, value: string): HTMLInputElement {
        const input = this.document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;

        return input;
    }
}

export default TransformToWebmasterLandingPlugin;