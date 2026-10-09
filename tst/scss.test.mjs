// Compiles every SCSS entry point and checks the guarantees each one makes.

import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';


const scssDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'scss');

const compile = (file) => sass.compile(path.join(scssDir, file), { sourceMap: false }).css;
const compileString = (source) =>
    sass.compileString(source, { loadPaths: [scssDir], sourceMap: false }).css;


describe('reset (index.scss)', () => {
    const css = compile('index.scss');

    it('resets every element with a zero-specificity selector', () => {
        assert.match(css, /^\* \{\n {2}margin: 0;\n {2}padding: 0;\n {2}border: 0;/m);
    });

    it('removes list markers, quotation marks and table spacing', () => {
        assert.match(css, /ol,\nul,\nmenu \{\n {2}list-style: none;/);
        assert.match(css, /blockquote,\nq \{\n {2}quotes: none;/);
        assert.match(css, /table \{\n {2}border-collapse: collapse;\n {2}border-spacing: 0;/);
        assert.match(css, /body \{\n {2}line-height: 1;/);
    });

    it('keeps the hidden attribute working', () => {
        assert.match(css, /\[hidden\] \{\n {2}display: none;/);
    });

    it('exposes the reset_bleed mixin', () => {
        const out = compileString('@use "index" as boot;\n.card { @include boot.reset_bleed; }');
        assert.match(out, /\.card \{\n {2}margin: 0;/);
    });
});


describe('normalize.scss', () => {
    it('compiles', () => {
        assert.match(compile('normalize.scss'), /normalize\.css v8\.0\.1/);
    });
});


describe('reboot.scss', () => {
    const css = compile('reboot.scss');

    it('compiles standalone with border-box sizing', () => {
        assert.match(css, /box-sizing: border-box;/);
    });

    it('omits declarations for null settings', () => {
        assert.doesNotMatch(css, /:root \{\n {2}font-size/);
    });

    it('accepts configuration through @use with', () => {
        const out = compileString(
            '@use "reboot" with ($body-bg: #fafafa, $font-size-root: 16px, $enable-smooth-scroll: false);',
        );
        assert.match(out, /background-color: #fafafa;/);
        assert.match(out, /:root \{\n {2}font-size: 16px;/);
        assert.doesNotMatch(out, /scroll-behavior/);
    });
});
