import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { MessageHelper } from "./messageHelper";
export class FilesHelpers {
  upperCaseFirstLetter = (string: string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  lowerCaseFirstLetter = (string: string) => {
    return string[0].toLowerCase() + string.slice(1);
  };
  askModuleName = async () => {
    let moduleName = "";
    const messageHelper: MessageHelper = new MessageHelper();
    const searchQuery = await vscode.window.showInputBox({
      placeHolder: "Enter Module Name (Name can't contain white space)",
      prompt: "Module like users, posts, blogs etc.",
      value: ""
    });
    if (searchQuery == undefined || searchQuery === "") {
      messageHelper.error("A search query is mandatory to execute this action");
      moduleName = await this.askModuleName();
    } else {
      moduleName = searchQuery == undefined ? "" : searchQuery?.toString();
      console.log(this.validateModuleName(moduleName.trim()));
      if (this.validateModuleName(moduleName.trim())) {
        messageHelper.error("Module can't contain white space.");
        moduleName = await this.askModuleName();
      }
    }
    return moduleName.trim();
  };
  createDir = (dirPath: string, mask = 0o755) => {
    fs.mkdirSync(dirPath, mask);
    if (fs.existsSync(dirPath)) {
      return true;
    } else {
      return false;
    }
  };

  validateModuleName = (name: string) => {
    /*const regexp = new RegExp("^(.*s+.*)+$");
    return !regexp.test(name);*/
    return name.includes(" ");
  };

  capitalize = (s: string) => {
    return s[0].toUpperCase() + s.slice(1);
  };
  createFiles = (fileName: string, data: string) => {
    fs.writeFileSync(fileName, data);
    if (fs.existsSync(fileName)) {
      return true;
    } else {
      return false;
    }
  };

  readFileAndReplace = (filename: string, moduleCap: string) => {
    const data = fs.readFileSync(
      path.join(__dirname, "..", "..", "src", "data", filename),
      {
        encoding: "utf8"
      }
    );

    let result = data.replaceAll("[ModuleName]", "" + moduleCap);
    result = result.replaceAll(
      "[SMPRO]",
      "" + this.lowerCaseFirstLetter(moduleCap)
    );
    result = result.replaceAll("[ROUTE]", "" + moduleCap.toLowerCase());
    return result;
  };
}
