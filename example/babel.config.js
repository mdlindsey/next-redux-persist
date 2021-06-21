module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            node: 'current',
          },
        },
        'transform-runtime': {},
        'styled-jsx': {},
        'class-properties': {},
      },
    ],
  ],
  plugins: [
    ['inline-react-svg', { svgo: false }],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": false
      }
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@public': './public',
          '@config': './config',
          '@src': './src',
        },
      },
    ],
  ],
};
