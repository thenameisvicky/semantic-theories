import { defineConfig } from '@rspack/cli';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.tsx',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'builtin:lightningcss-loader',
            options: {
              targets: 'defaults',
            },
          },
        ],
        type: 'css',
      },
    ],
  },
  plugins: [new ReactRefreshPlugin()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/[name].[contenthash].js',
    chunkFilename: 'assets/[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
    clean: true,
    publicPath: '/app-mdRunner/',
  },
  optimization: {
    minimize: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
});

