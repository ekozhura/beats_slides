module.exports = {
    entry: './main.ts',
    output: { filename: 'dist/application.js' },
    module: {
        loaders: [
            {
                test: /.ts$/, loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};