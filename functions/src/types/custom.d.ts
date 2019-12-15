import { DependencyContainer } from "tsyringe";

declare global {
  namespace NodeJS {
    interface Global {
      container: DependencyContainer;
    }
  }
}
