const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

 
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === '@react-native/assets-registry/registry') {
        return context.resolveRequest(context, 'react-native/asset-registry', platform);
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);