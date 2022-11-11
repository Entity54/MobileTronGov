module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
          "module-resolver",
          {
              alias: {
                  "@components": "./src/components",
                  "@data": "./src/data",
                  "@actions": "./src/actions",
                  "@utils": "./src/utils",
              },
          },
      ],
  ],
  };
};
