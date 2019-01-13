import {IPolarisGraphQLServer} from '@enigmatis/polaris';
import {Container} from "inversify";
import {schemaContainer} from "./schema/schema"
import {container} from "@enigmatis/polaris";
import {GraphQLLogProperties} from "@enigmatis/polaris/dist/logging/GraphQLLogProperties";
import {ContextLogPropertiesWrapper} from "@enigmatis/polaris/dist/logging/ContextLogPropertiesWrapper";
import {LoggerConfiguration} from "@enigmatis/polaris-logs/dist/src/LoggerConfiguration";
import {LogPropertiesWrapper} from "@enigmatis/polaris-logs/dist/src/LogPropertiesWrapper";
import {ApplicationLogProperties} from "@enigmatis/polaris-logs/dist/src/entities/ApplicationLogProperties";

let logPropertiesWrapper = new ContextLogPropertiesWrapper();
let applicationLogProperties = null;
let loggerConfiguration = new LoggerConfiguration("info", "127.0.0.1", 3000);

container.bind<LogPropertiesWrapper>("LogPropertiesWrapper")
    .toConstantValue(logPropertiesWrapper)
    .whenTargetNamed("GraphQLLogger");

container.bind<ApplicationLogProperties>("ApplicationLogProperties")
    .toConstantValue(applicationLogProperties)
    .whenTargetNamed("GraphQLLogger");

container.bind<LoggerConfiguration>("LoggerConfiguration")
    .toConstantValue(loggerConfiguration)
    .whenTargetNamed("GraphQLLogger");

let mergedContainer = Container.merge(container, schemaContainer);
let server: IPolarisGraphQLServer = mergedContainer.get<IPolarisGraphQLServer>("IPolarisGraphQLServer");

server.start();
