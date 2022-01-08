module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            'module-resolver',
            {
                root: ['.'],
                extensions: [
                    '.ts',
                    '.js',
                    '.tsx',
                    '.jsx',
                    '.json',
                    '.svg',
                    '.jpg',
                    '.png'
                ],
                alias: {
                    '@components': './src/components',
                    '@routes': './src/routes',
                    '@screens': './src/screens',
                    '@hooks': './src/hooks',
                    '@assets': './src/assets',
                    '@utils': './src/utils',
                    '@styles': './src/styles'
                }
            }
        ]
    };
};
