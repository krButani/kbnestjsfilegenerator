import * as vscode from "vscode";

export class MessageHelper {
  error = (message: string) => {
    vscode.window.showErrorMessage(message);
  };

  info = (message: string) => {
    vscode.window.showInformationMessage(message);
  };
}
