import path from 'path'
import pageRoutes from './router.config';
import webpackplugin from './plugin.config';

export default {
  // 路由配置
  routes: pageRoutes,
  treeShaking: true,
  base: '/blog/',
  publicPath: '/blog/',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      locale: {
        default: 'zh-CN',
      },
      title: 'blog',
      dll: false,
      routes: {
        exclude: [

          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,

          /components\//,
        ],
      },
    }],
  ],
  alias: {
    components: path.resolve(__dirname, '../src/components'),
    utils: path.resolve(__dirname, '../src/utils'),
    config: path.resolve(__dirname, '../config'),
  },
  externals: {
    moment: 'window.moment',
  },
  lessLoaderOptions: {
    modifyVars: {
      '@text-color': '#666',
      '@primary-color': '#00ADB5',
      '@font-family': '\'PingFangSC-light\',\'AvenirNext-Regular\', \'sans-serif\'',
    },
  },
  chainWebpack: webpackplugin,
  proxy: {
    '/blog/api/': {
      target: 'http://127.0.0.1:7001',
      pathRewrite: {
        '^/blog': '',
      },
      changeOrigin: true,
      secure: false,
    },
    '/blog/socket.io': {
      target: 'http://127.0.0.1:7001',
      pathRewrite: {
        '^/blog': '',
      },
      changeOrigin: true,
      secure: false,
    },
  },
  manifest: {
    name: 'Rulifun Blog',
    background_color: '#FFF',
    description: '一个全栈博客应用的前端部分✨',
    display: 'standalone',
    start_url: '/index.html',
    icons: [
      {
        src: 'https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/logo.png',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
  }
};
