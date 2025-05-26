import * as vscode from 'vscode';
import { TranslateService } from './services/translate';

let translateService: TranslateService;

export function activate(context: vscode.ExtensionContext) {
    try {
        translateService = new TranslateService();
    } catch (error) {
        vscode.window.showWarningMessage('Please configure your API key in settings');
        return;
    }

    // 监听配置变化
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('varTransAI')) {
                translateService.updateModel();
            }
        })
    );

    let disposable = vscode.commands.registerCommand('var-trans-ai.translateVariable', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const startLine = Math.max(0, selection.start.line - 2);
        const endLine = Math.min(editor.document.lineCount - 1, selection.start.line + 2);
        let lines = '';
        for (let i = startLine; i <= endLine; i++) {
            lines += editor.document.lineAt(i).text + '\n';
        }

        if (!text) {
            vscode.window.showWarningMessage('Please select a variable name to translate');
            return;
        }

        try {
            const language = editor.document.languageId;
            const translatedName = await translateService.translateVariable(text, lines.trim(), language);
            
            if (translatedName) {
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, translatedName);
                });
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Translation failed: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {} 