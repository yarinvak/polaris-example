import {inject, injectable} from "inversify";
import {PolarisLogger} from "@enigmatis/polaris-logs/dist/src/polaris-logger";
import {InjectableLogger, PolarisMiddleware} from "@enigmatis/polaris";
import {GraphQLResolveInfo} from "graphql";
import POLARIS_TYPES from '@enigmatis/polaris/dist/inversion-of-control/polaris-types';

@injectable()
export class ExampleMiddleware implements PolarisMiddleware{
    @inject(POLARIS_TYPES.InjectableLogger) polarisLogger: InjectableLogger;

    preResolve(root: any, args:{ [argName: string]: any }, context: any, info: GraphQLResolveInfo) {
        this.polarisLogger.debug(`from example before resolver, args: ${JSON.stringify(args)}`);
    }

    postResolve(root: any, args:{ [argName: string]: any }, context: any, info: GraphQLResolveInfo , result:string) {
        this.polarisLogger.debug(`from example after resolver, result: ${JSON.stringify(result)}`);
    }
}