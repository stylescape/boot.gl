import { exec } from 'child_process';
import micromatch from 'micromatch';
import path from 'path';
import serveStatic from 'serve-static';
import { promisify } from 'util';
import { defineConfig } from 'vite';


const execAsync = promisify(exec);
const rootDir = process.cwd();
const pathToDist = path.resolve(rootDir, 'dist');
const pathToStylescapeCss = path.resolve(rootDir, 'node_modules', 'stylescape', 'css');


// Sources that trigger a rebuild when they change
const watchGlobs = [
    'src/scss/**/*',
    'exe/**/*',
    'kist.yml',
];

// Builds never overlap: changes made during a build queue exactly one rerun
let building = false;
let rebuildQueued = false;

async function runKist(server) {
    if (building) {
        rebuildQueued = true;
        return;
    }
    building = true;

    console.log('[Kist] Running build...');
    try {
        const { stderr } = await execAsync('npx kist --config ./kist.yml', { cwd: rootDir });
        if (stderr) console.error('[Kist] stderr:', stderr);
        console.log('[Kist] Build complete');
        server?.ws.send({ type: 'full-reload', path: '*' });
    } catch (err) {
        console.error('[Kist] Build failed:', err.stdout || '', err.stderr || err.message);
    } finally {
        building = false;
        if (rebuildQueued) {
            rebuildQueued = false;
            runKist(server);
        }
    }
}

export default defineConfig({
    root: '.',
    publicDir: false,
    server: {
        port: 3000,
        open: true,
        fs: { strict: false },
        // The build writes to dist/; watching it would trigger reload loops
        watch: { ignored: ['**/dist/**', '**/node_modules/**'] },
    },
    plugins: [
        {
            name: 'serve-kist-html',
            configureServer(server) {
                runKist(server);

                server.middlewares.use('/css', serveStatic(path.join(pathToDist, 'css')));

                // Demo chrome is styled with stylescape; served straight from
                // node_modules so it never ends up in the published dist/
                server.middlewares.use('/vendor/stylescape', serveStatic(pathToStylescapeCss));

                // Serve / as index.html
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/') req.url = '/index.html';
                    next();
                });

                // Serve the rendered demo pages from dist/html
                server.middlewares.use(serveStatic(path.join(pathToDist, 'html')));

                const onSourceEvent = (file) => {
                    const relativePath = path.relative(rootDir, file);
                    if (micromatch.isMatch(relativePath, watchGlobs)) {
                        console.log(`[Kist] File changed: ${relativePath}`);
                        runKist(server);
                    }
                };
                server.watcher.on('change', onSourceEvent);
                server.watcher.on('add', onSourceEvent);
                server.watcher.on('unlink', onSourceEvent);
            },
        },
    ],
});
