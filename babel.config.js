module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-class-properties',
            [
                'module-resolver',
                {
                    root: ['./src/'],
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
                        '@components': './components/*',
                        '@routes': './routes',
                        '@screens': './screens',
                        '@hooks': './hooks',
                        '@assets': './assets',
                        '@utils': './utils',
                        '@styles': './styles'
                    }
                }
            ]
        ]
    };
};
