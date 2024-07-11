import arg from 'arg';
import type { Plugin, WatchMode } from 'esbuild';
import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import * as fs from 'fs';
import * as path from 'path';

interface Params {
  fromDir: string;
  toDir: string;
  watch: boolean;
  target: string;
  clean: boolean;
}

const omitImportNodeNSPlugin: Plugin = {
  name: 'omit-import-node-ns',
  setup(build) {
    build.onResolve({ filter: /^node:/ }, (args) => {
      return {
        path: args.path.slice(5),
        external: true,
      };
    });
  },
};

const main = async ({ fromDir, toDir, watch, target, clean }: Params) => {
  const fromDirAbs = path.resolve(process.cwd(), fromDir);
  const toDirAbs = path.resolve(process.cwd(), toDir);

  const entryPoints = fs
    .readdirSync(fromDirAbs)
    .map((f) => path.resolve(fromDirAbs, f))
    .filter((e) => e.endsWith('.ts'));
  const watchOptions: boolean | WatchMode = watch && {
    onRebuild(error, result) {
      if (error || !result) {
        console.error(error);
        return;
      }
      console.log(new Date(), `Build done for files under ${fromDirAbs}`);
    },
  };

  const cleanPlugin: Plugin = {
    name: 'clean',
    setup(build) {
      build.onStart(() => {
        try {
          fs.rmSync(toDirAbs, { recursive: true, force: true, maxRetries: 3 });
        } catch (_err: unknown) {
          // ignore error
        }
        fs.mkdirSync(toDirAbs, { recursive: true });
      });
    },
  };

  await build({
    platform: 'node',
    format: 'esm',
    target,
    minify: true,
    keepNames: true,
    sourcemap: 'inline',
    bundle: true,
    outdir: toDirAbs,
    outExtension: { '.js': '.mjs' },
    entryPoints,
    watch: watchOptions,
    plugins: [
      ...(clean ? [cleanPlugin] : []),
      omitImportNodeNSPlugin,
      nodeExternalsPlugin({
        allowList: [
          // small ESM packages
          'string-length',
          // in workspace
          'ansi-parser',
        ],
      }),
    ],
  });
};

const args = arg({
  '--watch': Boolean,
  '--from-dir': String,
  '--to-dir': String,
  '--target': String,
  '--clean': Boolean,
});
main({
  watch: Boolean(args['--watch']),
  fromDir: args['--from-dir'] || '',
  toDir: args['--to-dir'] || '',
  target: args['--target'] || '',
  clean: Boolean(args['--clean']),
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
