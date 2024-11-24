import * as swaggerJsDoc from 'swagger-jsdoc';
import * as TJS from 'typescript-json-schema';
import * as fs from 'fs';

export class SwaggerService {
  public specs: any;
  public schema: any;
  private controllersPath: string = './src/controllers';
  private controllerFiles: string[] = [];
  private options: any = {
    swaggerDefinition: {
      basePath: '/',
      openapi: '3.0.0',
    },
  };

  constructor() {
    this.getSchema();
    this.initOptions();
    this.getApiFiles();
    this.specs = swaggerJsDoc(this.options);
  }

  initOptions() {
    this.options.apis = this.controllerFiles;
    this.options.swaggerDefinition.definitions = this.schema?.definitions;
    this.options.swaggerDefinition.components = {
      schemas: this.schema?.definitions,
      securitySchemes: {
        accessToken: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Example value: ```Bearer <accessToken>```',
        },
      },
      security: [
        {
          accessToken: [],
        },
      ],
    };
  }

  private getSchema() {
    const classesPath = './src/definitions';
    const classesFiles: string[] = [];
    this.getFileNamesInPath(classesPath, classesFiles);
    const program = TJS.getProgramFromFiles(
      classesFiles,
      {
        strictNullChecks: true,
      },
      '/',
    );
    this.schema = TJS.generateSchema(program, '*', {
      required: true,
      ignoreErrors: true,
    });
  }

  getApiFiles() {
    this.getFileNamesInPath(this.controllersPath, this.controllerFiles);
  }

  getFileNamesInPath(path: string, files: any = []) {
    fs.readdirSync(path).forEach((file: any) => {
      const fileOrDir = path + '/' + file;
      if (fs.lstatSync(fileOrDir).isFile()) {
        files.push(fileOrDir);
      } else if (fs.lstatSync(fileOrDir).isDirectory()) {
        return this.getFileNamesInPath(fileOrDir, files);
      }
    });
  }
}
