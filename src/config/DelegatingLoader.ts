import { ResourceFile } from '../core/Core';
import { FileLoaderLoadException } from './exception/FileLoaderLoadException';
import { ILoaderResolver } from './ILoaderResolver';
import { Loader } from './Loader';

/**
 * DelegatingLoader delegates loading to other loaders using a loader resolver.
 *
 * This loader acts as an array of ILoader objects - each having a chance to load a given resource
 * (handled by the resolver).
 */
export class DelegatingLoader extends Loader {
    /**
     * Constructor.
     *
     * @param resolver A ILoaderResolver instance.
     */
    constructor(resolver: ILoaderResolver) {
        super(null as any);
        this._resolver = resolver;
    }

    /** @inheritDoc */
    public async load(resourceFile: ResourceFile, type?: string) {
        const loader = this.resolver.resolve(resourceFile, type);
        if (!loader) {
            throw new FileLoaderLoadException(`Can not resolve resource: ${resourceFile.path}.`);
        }

        return loader.load(resourceFile, type);
    }

    /** @inheritDoc */
    public supports(resourceFile: ResourceFile, type?: string) {
        return !this.resolver.resolve(resourceFile, type);
    }
}
