const path = require('path');

module.exports = {
  // Configuración de webpack
  webpack: {
    configure: (webpackConfig) => {
      // Añadir alias para imports
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      };
      return webpackConfig;
    },
  },
  // Configuración de babel
  babel: {
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      }],
    ],
  },
  // Configuración de Jest
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
};