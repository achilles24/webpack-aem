const path = require('path');

module.exports = {
    libraryName: "clientlib-webpack",
    libraryPath: "apps/webpack-project/clientlibs",
    categories: ["webpack-project.main"],
    assets: {
        js: [
            "dist/runtime.*.js",
            "dist/vendors.*.js",
            "dist/main.*.js"
        ],
        css: [
            "dist/**/*.css"
        ]
    },
    dependencies: [
        "cq.jquery"
    ],
    // Add these required options
    context: path.join(__dirname),
    cwd: __dirname,
    properties: {
        jcr:primaryType: 'cq:ClientLibraryFolder'
    }
};