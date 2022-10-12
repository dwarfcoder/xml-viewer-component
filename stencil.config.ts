import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'xmlviewercomponent',
  srcDir: 'src',
  buildEs5: false,
  enableCache: true,

  outputTargets: [
    {
      type: 'dist',
      dir: 'dist',
      empty: true,
    },
    {
      type: 'www',
      buildDir: 'build',
      dir: 'www',
      empty: true,
      indexHtml: 'index.html',
      serviceWorker: false
    },
    angularOutputTarget({
      componentCorePackage: 'xml-viewer-component',
      directivesProxyFile: './dist/lib/stencil-generated/components.ts',
      directivesArrayFile: './dist/lib/stencil-generated/index.ts',
    })    
  ],
  devServer: {
    reloadStrategy: 'pageReload',
    port: 3333,
    root: 'www'
  }
};