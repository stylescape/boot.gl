// Compiles every SCSS entry point and checks the guarantees each one makes.
// The output is parsed with PostCSS, so formatting changes in Sass don't
// break the assertions.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import * as sass from 'sass';


const scssDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'scss');

const parse = (css) => postcss.parse(css);
const compile = (file) => parse(sass.compile(path.join(scssDir, file), { sourceMap: false }).css);
const compileString = (source) =>
    parse(sass.compileString(source, { loadPaths: [scssDir], sourceMap: false }).css);

// Declarations of every rule whose selector list contains `selector`,
// merged in source order, as { property: value }
function declarations(root, selector) {
    const result = {};
    root.walkRules((rule) => {
        if (!rule.selectors.includes(selector)) return;
        rule.walkDecls((decl) => {
            if (decl.parent === rule) result[decl.prop] = decl.value;
        });
    });
    return result;
}

const properties = (root) => {
    const found = new Set();
    root.walkDecls((decl) => found.add(`${decl.prop}: ${decl.value}`));
    return found;
};

// The single top-level `@layer` block, or undefined
// Rules as comparable strings: selector list and declarations with quotes
// and whitespace removed (Sass unquotes attribute selectors), comments dropped
const ruleSignatures = (root) => {
    const clean = (text) => text.replace(/['"]/g, '').replace(/\s+/g, ' ').trim();
    const signatures = [];
    root.walkRules((rule) => {
        const decls = rule.nodes
            .filter((node) => node.type === 'decl')
            .map((decl) => `${decl.prop}: ${clean(decl.value)}`);
        signatures.push(`${rule.selectors.map(clean).join(', ')} { ${decls.join('; ')} }`);
    });
    return signatures;
};

const topLayer = (root) => {
    const nodes = root.nodes.filter((node) => node.type !== 'comment');
    return nodes.length === 1 && nodes[0].type === 'atrule' && nodes[0].name === 'layer'
        ? nodes[0]
        : undefined;
};


describe('reset (index.scss)', () => {
    const css = compile('index.scss');

    it('resets every element with a zero-specificity selector', () => {
        const universal = declarations(css, '*');
        for (const [prop, value] of Object.entries({
            margin: '0', padding: '0', border: '0', font: 'inherit', 'vertical-align': 'baseline',
        })) {
            assert.equal(universal[prop], value, prop);
        }
    });

    it('removes list markers, quotation marks and table spacing', () => {
        assert.equal(declarations(css, 'menu')['list-style'], 'none');
        assert.equal(declarations(css, 'q').quotes, 'none');
        assert.equal(declarations(css, 'q::before').content, 'none');
        assert.equal(declarations(css, 'table')['border-spacing'], '0');
        assert.equal(declarations(css, 'body')['line-height'], '1');
    });

    it('drops legacy rules', () => {
        assert.ok(!properties(css).has('content: ""'));
        assert.deepEqual(declarations(css, 'article'), {});
    });

    it('applies the modern defaults', () => {
        assert.equal(declarations(css, '::before')['box-sizing'], 'border-box');
        assert.equal(declarations(css, ':root')['interpolate-size'], 'allow-keywords');
        assert.equal(declarations(css, ':where(img, picture, video, canvas, svg)').display, 'block');
        assert.equal(declarations(css, ':where(h1, h2, h3, h4, h5, h6)')['text-wrap'], 'balance');
    });

    it('turns the modern defaults off through settings', () => {
        const out = compileString(`@use "index" with (
            $box-sizing: false, $media-block: false, $text-wrap: false, $interpolate-size: false
        );`);
        const found = properties(out);
        for (const prop of ['box-sizing', 'interpolate-size', 'text-wrap', 'max-inline-size']) {
            assert.ok(![...found].some((decl) => decl.startsWith(`${prop}:`)), prop);
        }
    });

    it('keeps the hidden attribute working, except hidden="until-found"', () => {
        let selector;
        css.walkRules(/\[hidden/, (rule) => { selector = rule.selector; });
        assert.match(selector, /^\[hidden\]:not\(\[hidden="?until-found"?\]\)$/);
    });

    it('stops motion for users who prefer reduced motion', () => {
        let media;
        css.walkAtRules('media', (rule) => { media = rule; });
        assert.equal(media?.params, '(prefers-reduced-motion: reduce)');
        assert.equal(declarations(media, '*')['transition-duration'], '0.01ms');
        const off = compileString('@use "index" with ($reduced-motion: false);');
        off.walkAtRules('media', (rule) => assert.fail(rule.params));
    });

    it('wraps the output in a cascade layer on request', () => {
        assert.equal(topLayer(css), undefined);
        const layer = topLayer(compileString('@use "index" with ($layer: boot);'));
        assert.equal(layer?.params, 'boot');
    });

    it('exposes the mixins', () => {
        const out = compileString('@use "index" as boot;\n.card { @include boot.reset-bleed; }');
        assert.equal(declarations(out, '.card').margin, '0');
    });
});


describe('mixins', () => {
    it('emit no CSS of their own', () => {
        const out = compileString('@use "mixins" as boot;\n.card { @include boot.reset_bleed; }');
        const selectors = [];
        out.walkRules((rule) => selectors.push(rule.selector));
        assert.deepEqual(selectors, ['.card']);
    });
});


describe('normalize.scss', () => {
    const css = compile('normalize.scss');

    const upstreamFile = createRequire(import.meta.url).resolve('modern-normalize');
    const upstream = fs.readFileSync(upstreamFile, 'utf8');

    it('keeps the license comment of the upstream version', () => {
        assert.equal(css.first.toString(), upstream.split('\n')[0]);
    });

    it('matches the modern-normalize devDependency rule for rule', () => {
        assert.deepEqual(ruleSignatures(css), ruleSignatures(postcss.parse(upstream)));
    });

    it('wraps the output in a cascade layer on request', () => {
        const layer = topLayer(compileString('@use "normalize" with ($layer: boot);'));
        assert.equal(layer?.params, 'boot');
    });
});


describe('reboot.scss', () => {
    const css = compile('reboot.scss');

    it('compiles standalone with border-box sizing', () => {
        assert.equal(declarations(css, '*::after')['box-sizing'], 'border-box');
    });

    it('omits declarations for null settings', () => {
        assert.equal(declarations(css, ':root')['font-size'], undefined);
    });

    it('accepts configuration through @use with', () => {
        const out = compileString(
            '@use "reboot" with ($body-bg: #fafafa, $font-size-root: 16px, $enable-smooth-scroll: false);',
        );
        assert.match(declarations(out, ':root')['--boot-body-bg'], /#fafafa/);
        assert.equal(declarations(out, ':root')['font-size'], '16px');
        assert.ok(!properties(out).has('scroll-behavior: smooth'));
    });

    it('emits colors as custom properties with dark-mode values', () => {
        const root = declarations(css, ':root');
        assert.equal(root['color-scheme'], 'light dark');
        assert.equal(root['--boot-body-bg'], 'light-dark(#fff, #212529)');
        assert.equal(declarations(css, 'body')['background-color'], 'var(--boot-body-bg)');
    });

    it('emits light colors only when dark mode is off', () => {
        const out = compileString('@use "reboot" with ($enable-dark-mode: false, $prefix: "x-");');
        const root = declarations(out, ':root');
        assert.equal(root['color-scheme'], undefined);
        assert.equal(root['--x-body-bg'], '#fff');
        assert.equal(declarations(out, 'body').color, 'var(--x-body-color)');
    });

    it('drops a color whose setting is false', () => {
        const out = compileString('@use "reboot" with ($code-color: false);');
        assert.equal(declarations(out, ':root')['--boot-code-color'], undefined);
        assert.equal(declarations(out, 'code').color, undefined);
    });

    it('derives spacing from $spacer', () => {
        const out = compileString('@use "reboot" with ($spacer: 2rem);');
        assert.equal(declarations(out, 'p')['margin-block'], '0 2rem');
        assert.equal(declarations(out, 'figure')['margin-block'], '0 2rem');
        assert.equal(declarations(out, 'dd')['margin-block-end'], '1rem');
        assert.equal(declarations(out, 'ul')['padding-inline-start'], '4rem');
    });

    it('uses logical properties only', () => {
        const physical = /^(margin|padding)-(left|right)$|^(float|clear|text-align): (left|right)$/;
        for (const decl of properties(css)) {
            assert.doesNotMatch(decl, physical);
        }
    });

    it('keeps the hidden attribute working, except hidden="until-found"', () => {
        let selector;
        css.walkRules(/\[hidden/, (rule) => { selector = rule.selector; });
        assert.match(selector, /until-found/);
    });

    it('shows ARIA and disabled states with cursors', () => {
        assert.equal(declarations(css, '[aria-busy=true]').cursor, 'progress');
        assert.equal(declarations(css, ':disabled').cursor, 'not-allowed');
        const off = compileString('@use "reboot" with ($enable-aria-cursors: false);');
        assert.equal(declarations(off, ':disabled').cursor, undefined);
    });

    it('stops motion for users who prefer reduced motion', () => {
        const media = [];
        css.walkAtRules('media', (rule) => media.push(rule.params));
        assert.ok(media.includes('(prefers-reduced-motion: reduce)'));
    });

    it('wraps the output in a cascade layer on request', () => {
        const layer = topLayer(compileString('@use "reboot" with ($layer: boot);'));
        assert.equal(layer?.params, 'boot');
    });
});


describe('print.scss', () => {
    const css = compile('print.scss');

    it('applies to print only', () => {
        const nodes = css.nodes.filter((node) => node.type !== 'comment');
        assert.equal(nodes.length, 1);
        assert.equal(nodes[0].params, 'print');
    });

    it('prints link URLs unless turned off', () => {
        assert.equal(declarations(css, 'a[href]::after').content, '" (" attr(href) ")"');
        const off = compileString('@use "print" with ($show-link-urls: false);');
        assert.deepEqual(declarations(off, 'a[href]::after'), {});
    });

    it('wraps the output in a cascade layer on request', () => {
        const layer = topLayer(compileString('@use "print" with ($layer: boot);'));
        assert.equal(layer?.params, 'boot');
    });
});
