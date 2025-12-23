export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface DeploymentGuide {
  name: string;
  url: string;
  description: string;
  steps: string[];
}
