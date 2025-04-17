import * as vscode from 'vscode';
import prompts from './prompts.json'; // Adjust the path to your prompts.json file


interface PromptEntry {
	label: string;
	prompt: string;
  }

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "ba-prompt-engineering" is now active!');

	const disposable = vscode.commands.registerCommand('extension.insertCopilotPrompt', async () => {
		vscode.window.showInformationMessage('Hello World from BA_Prompt_Engineering!');


		const promptingCategories = Object.keys(prompts);
        const selectedPromptingCategories = await vscode.window.showQuickPick(promptingCategories, {
            placeHolder: 'Select prompt category',
        });

		if (!selectedPromptingCategories) {
			return; 
		}

		const promptsContent = (prompts as any)[selectedPromptingCategories];
        const selectedPromptLabel = await vscode.window.showQuickPick(promptsContent, {
            placeHolder: 'Select a prompt',
        });

		const selectedPrompt = promptsContent.find((p: any) => p.label === selectedPromptLabel)?.prompt;

		// Insert prompt at cursor position
		const editor = vscode.window.activeTextEditor;
		if (editor && selectedPrompt) {
    	editor.edit(editBuilder => {
        	editBuilder.insert(editor.selection.active, selectedPrompt);
    		});
		}	
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
}
