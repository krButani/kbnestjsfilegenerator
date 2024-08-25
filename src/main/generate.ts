import * as vscode from "vscode";
import { FilesHelpers } from "../utils/filesHelper";
import { MessageHelper } from "../utils/messageHelper";
export class Generate {
  FilesAndFolder = async (
    path: string,
    filesHelper: FilesHelpers,
    messageHelper: MessageHelper
  ) => {
    // Getting Module Name Start
    const moduleName = await filesHelper.askModuleName();

    // Getting Module Name End
    if (moduleName === "") {
      messageHelper.error("A search query is mandatory to execute this action");
    } else {
      const directoryModuleName = filesHelper.lowerCaseFirstLetter(
        moduleName?.trim()
      );
      let directoryName = path + directoryModuleName;
      if (filesHelper.createDir(directoryName)) {
        const dtoDir = directoryName + "/dto";
        filesHelper.createDir(dtoDir);

        let entityFile = directoryModuleName + ".entity.ts";
        let providersFile = directoryModuleName + ".providers.ts";
        let serviceFile = directoryModuleName + ".service.ts";
        let controllerFile = directoryModuleName + ".controller.ts";
        let moduleFile =
          directoryName + "/" + directoryModuleName + ".module.ts";

        entityFile = filesHelper.createDir(directoryName + "/entity")
          ? directoryName + "/entity/" + entityFile
          : directoryName + "/" + entityFile;

        providersFile = filesHelper.createDir(directoryName + "/providers")
          ? directoryName + "/providers/" + providersFile
          : directoryName + "/" + providersFile;

        serviceFile = filesHelper.createDir(directoryName + "/service")
          ? directoryName + "/service/" + serviceFile
          : directoryName + "/" + serviceFile;

        controllerFile = filesHelper.createDir(directoryName + "/controller")
          ? directoryName + "/controller/" + controllerFile
          : directoryName + "/" + controllerFile;

        filesHelper.createFiles(entityFile, "");
        filesHelper.createFiles(providersFile, "");
        filesHelper.createFiles(serviceFile, "");
        filesHelper.createFiles(controllerFile, "");
        filesHelper.createFiles(moduleFile, "");
      } else {
        messageHelper.error("We are unable to create module directory.");
      }
    }
  };

  FilesAndFolderWithData = async (
    path: string,
    filesHelper: FilesHelpers,
    messageHelper: MessageHelper
  ) => {
    // Getting Module Name Start
    const moduleName = await filesHelper.askModuleName();

    // Getting Module Name End
    if (moduleName === "") {
      messageHelper.error("A search query is mandatory to execute this action");
    } else {
      const directoryModuleName = filesHelper.lowerCaseFirstLetter(
        moduleName?.trim()
      );
      let newModuleName = filesHelper.upperCaseFirstLetter(moduleName?.trim());
      let directoryName = path + directoryModuleName;
      if (filesHelper.createDir(directoryName)) {
        // Create Dto files and folder Start
        const dtoDir = directoryName + "/dto";
        let dtoDirectory = filesHelper.createDir(dtoDir) ? dtoDir : "";
        // Create Dto files and folder End

        //  Entity  Start
        let entityFile = directoryModuleName + ".entity.ts";
        entityFile = filesHelper.createDir(directoryName + "/entity")
          ? directoryName + "/entity/" + entityFile
          : directoryName + "/" + entityFile;
        filesHelper.createFiles(entityFile, "");
        //  Entity  End

        //  Provider Start
        let providersFile = directoryModuleName + ".providers.ts";
        providersFile = filesHelper.createDir(directoryName + "/providers")
          ? directoryName + "/providers/" + providersFile
          : directoryName + "/" + providersFile;
        filesHelper.createFiles(providersFile, "");
        //  Provider End

        // Service Start
        let serviceFile = directoryModuleName + ".service.ts";
        serviceFile = filesHelper.createDir(directoryName + "/service")
          ? directoryName + "/service/" + serviceFile
          : directoryName + "/" + serviceFile;
        const serviceData = filesHelper.readFileAndReplace(
          "template/service.txt",
          newModuleName
        );
        filesHelper.createFiles(serviceFile, serviceData);
        // Service End
        // Controller Start
        let controllerFile = directoryModuleName + ".controller.ts";
        controllerFile = filesHelper.createDir(directoryName + "/controller")
          ? directoryName + "/controller/" + controllerFile
          : directoryName + "/" + controllerFile;
        const controllerData = filesHelper.readFileAndReplace(
          "template/controller.txt",
          newModuleName
        );
        filesHelper.createFiles(controllerFile, controllerData);
        // Controller End
        // Module
        let moduleFile =
          directoryName + "/" + directoryModuleName + ".module.ts";
        const moduleData = filesHelper.readFileAndReplace(
          "template/module.txt",
          newModuleName
        );
        filesHelper.createFiles(moduleFile, moduleData);
      } else {
        messageHelper.error("We are unable to create module directory.");
      }
    }
  };

  FilesAndFolderWithDataKB = async (
    path: string,
    filesHelper: FilesHelpers,
    messageHelper: MessageHelper
  ) => {
    // Getting Module Name Start
    const moduleName = await filesHelper.askModuleName();

    // Getting Module Name End
    if (moduleName === "") {
      messageHelper.error("A search query is mandatory to execute this action");
    } else {
      const directoryModuleName = filesHelper.lowerCaseFirstLetter(
        moduleName?.trim()
      );
      let newModuleName = filesHelper.upperCaseFirstLetter(moduleName?.trim());
      let directoryName = path + directoryModuleName;
      if (filesHelper.createDir(directoryName)) {
        // Create Dto files and folder Start
        const dtoDir = directoryName + "/dto";
        let dtoDirectory = filesHelper.createDir(dtoDir) ? dtoDir : "";

        let requestDtoFile =
          dtoDirectory + "/" + directoryModuleName + "Request.dto.ts";

        let DtoFile = dtoDirectory + "/" + directoryModuleName + ".dto.ts";
        let singleDtoFile =
          dtoDirectory + "/" + directoryModuleName + "SingleId.dto.ts";
        let deleteDtoFile =
          dtoDirectory + "/" + directoryModuleName + "DeleteRequest.dto.ts";

        const requestDtoData = filesHelper.readFileAndReplace(
          "dto/requestDto.txt",
          newModuleName
        );
        const idDtoData = filesHelper.readFileAndReplace(
          "dto/idDto.txt",
          newModuleName
        );
        const deleteRequestDtoData = filesHelper.readFileAndReplace(
          "dto/deleteRequestDto.txt",
          newModuleName
        );
        const DtoData = filesHelper.readFileAndReplace(
          "dto/dto.txt",
          newModuleName
        );

        filesHelper.createFiles(DtoFile, DtoData);
        filesHelper.createFiles(requestDtoFile, requestDtoData);
        filesHelper.createFiles(singleDtoFile, idDtoData);
        filesHelper.createFiles(deleteDtoFile, deleteRequestDtoData);
        // Create Dto files and folder End

        //  Entity  Start
        let entityFile = directoryModuleName + ".entity.ts";
        entityFile = filesHelper.createDir(directoryName + "/entity")
          ? directoryName + "/entity/" + entityFile
          : directoryName + "/" + entityFile;
        const entityData = filesHelper.readFileAndReplace(
          "entity.txt",
          newModuleName
        );
        filesHelper.createFiles(entityFile, entityData);
        //  Entity  End

        //  Provider Start

        let providersFile = directoryModuleName + ".providers.ts";
        providersFile = filesHelper.createDir(directoryName + "/providers")
          ? directoryName + "/providers/" + providersFile
          : directoryName + "/" + providersFile;
        const providerData = filesHelper.readFileAndReplace(
          "providers.txt",
          newModuleName
        );
        filesHelper.createFiles(providersFile, providerData);

        //  Provider End

        // Service Start
        let serviceFile = directoryModuleName + ".service.ts";
        serviceFile = filesHelper.createDir(directoryName + "/service")
          ? directoryName + "/service/" + serviceFile
          : directoryName + "/" + serviceFile;
        const serviceData = filesHelper.readFileAndReplace(
          "service.txt",
          newModuleName
        );
        filesHelper.createFiles(serviceFile, serviceData);
        // Service End
        // Controller Start
        let controllerFile = directoryModuleName + ".controller.ts";
        controllerFile = filesHelper.createDir(directoryName + "/controller")
          ? directoryName + "/controller/" + controllerFile
          : directoryName + "/" + controllerFile;
        const controllerData = filesHelper.readFileAndReplace(
          "controller.txt",
          newModuleName
        );
        filesHelper.createFiles(controllerFile, controllerData);
        // Controller End
        // Module
        let moduleFile =
          directoryName + "/" + directoryModuleName + ".module.ts";
        const moduleData = filesHelper.readFileAndReplace(
          "module.txt",
          newModuleName
        );
        filesHelper.createFiles(moduleFile, moduleData);
      } else {
        messageHelper.error("We are unable to create module directory.");
      }
    }
  };
}
