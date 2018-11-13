const NwBuilder = require('nw-builder');

const nw = new NwBuilder({
    version: '0.14.6',
    files: './lib/**/**/**',
    macIcns: './lib/icon.png',
    macPlist: { mac_bundle_id: 'myPkg' },
    platforms: ['osx64']
});

// Log stuff you want
nw.on('log', (msg) => {
    console.log(msg);
});

// Build returns a promise, return it so the task isn't called in parallel
nw.build()
    .then(() => {
        console.log('Done!');
    })
    .catch((err) => {
        console.log(err);
    });