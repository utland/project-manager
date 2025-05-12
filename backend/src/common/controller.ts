import {Router} from "api-server";
import {ServerAPI} from "api-server";
import Service from "./service.js";

abstract class Controller<T extends Service> {
  router: Router
  service: T;

  constructor(service: T) {
    this.router = new Router(); 
    this.service = service;
  }
}

export default Controller;
