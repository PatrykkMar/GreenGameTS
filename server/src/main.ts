import "reflect-metadata"
import AppServer from "./AppServer";
import { container } from "tsyringe";

const app = container.resolve(AppServer);
app.init();