export const config = {
    runtime: 'edge', // for Edge API Routes only
    unstable_allowDynamic: [
      '/node_modules/lodash/**',
      '/Localization/i18n', // use a glob to allow anything in the function-bind 3rd party module
    ],
  }