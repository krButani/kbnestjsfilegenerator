import * as vscode from "vscode";
import { FilesHelpers } from "./utils/filesHelper";
import { MessageHelper } from "./utils/messageHelper";
import { Generate } from "./main/generate";

export function activate(context: vscode.ExtensionContext) {
  const filesHelper: FilesHelpers = new FilesHelpers();
  const messageHelper: MessageHelper = new MessageHelper();
  const G: Generate = new Generate();

  const onlyFileGenerator = vscode.commands.registerCommand(
    "kbNestJsFileGenerator.onlyFileGenerator",
    async (resource: vscode.Uri) => {
      const path = resource.fsPath + "/";

      //messageHelper.info("Command Fired Success!");
      G.FilesAndFolder(path, filesHelper, messageHelper);
    }
  );

  const onlyFileGeneratorWithCode = vscode.commands.registerCommand(
    "kbNestJsFileGenerator.withCodeFileGenerator",
    async (resource: vscode.Uri) => {
      const path = resource.fsPath + "/";

      //messageHelper.info("Command Fired Success!");
      G.FilesAndFolderWithData(path, filesHelper, messageHelper);
    }
  );
  const onlyFileGeneratorWithCodeKB = vscode.commands.registerCommand(
    "kbNestJsFileGenerator.withCodeFileGeneratorKB",
    async (resource: vscode.Uri) => {
      const path = resource.fsPath + "/";

      // messageHelper.info("Command Fired Success!");
      G.FilesAndFolderWithDataKB(path, filesHelper, messageHelper);
    }
  );

  context.subscriptions.push(
    onlyFileGenerator,
    onlyFileGeneratorWithCode,
    onlyFileGeneratorWithCodeKB
  );
}

export function deactivate() {}
