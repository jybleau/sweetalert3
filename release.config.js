module.exports = {
  debug: true,
  branches: ['main'],
  verifyConditions: ['@semantic-release/changelog', '@semantic-release/npm', '@semantic-release/github'],
  prepare: [
    {
      path: '@semantic-release/exec',
      cmd: 'VERSION=${nextRelease.version} ./node_modules/.bin/zx tools/build-dist.mjs',
    },
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
  publish: [
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/sweetalertbee.all.js' },
          { path: 'dist/sweetalertbee.all.min.js' },
          { path: 'dist/sweetalertbee.css' },
          { path: 'dist/sweetalertbee.esm.all.js' },
          { path: 'dist/sweetalertbee.esm.all.min.js' },
          { path: 'dist/sweetalertbee.esm.js' },
          { path: 'dist/sweetalertbee.esm.min.js' },
          { path: 'dist/sweetalertbee.js' },
          { path: 'dist/sweetalertbee.min.css' },
          { path: 'dist/sweetalertbee.min.js' },
          { path: 'themes/borderless.css' },
          { path: 'themes/minimal.css' },
          { path: 'themes/embed-iframe.css' },
        ],
      },
    ],
  ],
  success: [
    '@semantic-release/github',
    {
      path: '@semantic-release/exec',
      cmd: './node_modules/.bin/zx tools/purge-jsdelivr.mjs',
    },
  ],
}
