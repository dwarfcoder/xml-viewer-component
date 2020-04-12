import { Config } from '@stencil/core';

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
    }
  ],
  devServer: {
    reloadStrategy: 'pageReload',
    port: 3333,
    root: 'www'
  }
};