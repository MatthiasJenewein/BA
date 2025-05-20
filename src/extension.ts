import * as vscode from 'vscode';
import prompts from './prompts.json'; 


interface PromptItem extends vscode.QuickPickItem {
	prompt: string;
}

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('extension.insertCopilotPrompt', async () => {
		vscode.window.showInformationMessage('Hello World from BA_Prompt_Engineering!');


		const promptingCategories = Object.keys(prompts);
		const category = await vscode.window.showQuickPick(promptingCategories, {
			placeHolder: 'Select prompt category'
		});
		if (!category) { return; }

		const promptsContent = (prompts as any)[category];

		const promptItem = await vscode.window.showQuickPick<PromptItem>(
			promptsContent,                   
			{ placeHolder: 'Select a prompt' }
		  );
		  if (!promptItem) { return; }
		  
		  await vscode.commands.executeCommand(
			'workbench.action.chat.open',
			{ query: promptItem.prompt, isPartialQuery: false }
		  );
		
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
}
