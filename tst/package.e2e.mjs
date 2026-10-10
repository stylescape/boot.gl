// Packs dist/ the way `npm publish` does, installs the tarball into a
// scratch project and loads every entry point through the package. Run after
// `npm run build`: `npm run test:package`.

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';


const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

let projectDir;
let packageDir;
let files;

before(() => {
    assert.ok(fs.existsSync(path.join(distDir, 'package.json')), 'dist/ is missing; run `npm run build` first');

    // realpath: on macOS the temp dir sits behind the /var -> /private/var symlink
    projectDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'boot.gl-package-')));
    const [packed] = JSON.parse(execFileSync(
        'npm', ['pack', '--json', '--pack-destination', projectDir],
        { cwd: distDir, encoding: 'utf8' },
    ));
    files = packed.files.map((file) => file.path);

    packageDir = path.join(projectDir, 'node_modules', 'boot.gl');
    fs.mkdirSync(packageDir, { recursive: true });
    execFileSync('tar', ['-xzf', path.join(projectDir, packed.filename), '-C', packageDir, '--strip-components=1']);
});

after(() => {
    if (projectDir) fs.rmSync(projectDir, { recursive: true, force: true });
});


describe('published package', () => {
    it('contains the stylesheets and Sass sources', () => {
        for (const name of ['boot.gl', 'normalize', 'reboot', 'print']) {
            assert.ok(files.includes(`css/${name}.css`), `css/${name}.css`);
            assert.ok(files.includes(`css/${name}.min.css`), `css/${name}.min.css`);
        }
        for (const name of ['index', '_mixins', '_reset', 'normalize', 'reboot', 'print']) {
            assert.ok(files.includes(`scss/${name}.scss`), `scss/${name}.scss`);
        }
    });

    it('ships a package.json without private or types', () => {
        const pkg = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'));
        assert.equal(pkg.private, undefined);
        assert.equal('types' in pkg, false);
        assert.equal(pkg.version, JSON.parse(fs.readFileSync(path.join(distDir, '..', 'package.json'), 'utf8')).version);
    });

    it('resolves the CSS through exports', () => {
        const require = createRequire(path.join(projectDir, 'index.js'));
        assert.equal(require.resolve('boot.gl'), path.join(packageDir, 'css', 'boot.gl.css'));
        assert.equal(require.resolve('boot.gl/css/reboot.min.css'), path.join(packageDir, 'css', 'reboot.min.css'));
    });

    it('resolves every Sass entry point through pkg: URLs', () => {
        const compile = (source) => sass.compileString(source, {
            importers: [new sass.NodePackageImporter(projectDir)],
        }).css;

        assert.match(compile('@use "pkg:boot.gl";'), /list-style: none/);
        assert.match(compile('@use "pkg:boot.gl/scss/normalize";'), /modern-normalize/);
        assert.match(compile('@use "pkg:boot.gl/scss/print";'), /@media print/);
        assert.match(compile('@use "pkg:boot.gl/scss/reboot" with ($body-bg: #fafafa);'), /#fafafa/);
        assert.equal(
            compile('@use "pkg:boot.gl/scss/mixins" as boot;\n.card { @include boot.reset-bleed; }').trim().split('\n')[0],
            '.card {',
        );
    });
});
