module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
                },
            },
        ],
        '@babel/react',
        '@babel/preset-typescript',
    ],
    plugins: ['babel-plugin-webpack-alias'],
};
