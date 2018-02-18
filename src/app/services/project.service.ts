import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  getProjects (): Promise<string[]> {
    return this.http.get('/projects')
      .toPromise()
      .then((res: Response) => res.json());
  }

  getProject (project: string): Promise<string[]> {
    return this.http.get(`/projects/${project}`)
      .toPromise()
      .then((res: Response) => res.json());
  }

}
