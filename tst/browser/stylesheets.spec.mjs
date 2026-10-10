// Loads each stylesheet into a real browser and checks computed styles, so
// the guarantees hold in Chromium, Firefox and WebKit, not only in the Sass
// output. Computed styles instead of screenshots: they don't depend on the
// fonts installed on the machine running the tests.

import { expect, test } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';


const scssDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'scss');

const compile = (source) => sass.compileString(source, { loadPaths: [scssDir] }).css;

const fixture = `
    <h1>Heading</h1>
    <p>Paragraph with <b>bold</b> and <a href="https://boot.gl">a link</a>.</p>
    <ul><li>Item</li></ul>
    <img alt="" width="10" height="10" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">
    <button type="button">Enabled</button>
    <button type="button" disabled>Disabled</button>
    <details><summary>Summary</summary></details>
    <div id="hidden" hidden>Hidden</div>
    <div id="animated" style="transition: opacity 1s">Animated</div>
`;

// Render the fixture with `css`; `before` is unlayered CSS placed first
async function render(page, css, { before = '', dir = 'ltr' } = {}) {
    await page.setContent(`<!doctype html><html dir="${dir}"><head>
        <style>${before}</style><style>${css}</style>
    </head><body>${fixture}</body></html>`);
}

const style = (page, selector, property, pseudo = null) =>
    page.locator(selector).first().evaluate(
        (el, [prop, pseudoElement]) => getComputedStyle(el, pseudoElement).getPropertyValue(prop),
        [property, pseudo],
    );


test.describe('reset', () => {
    const css = compile('@use "index";');

    test('strips element styling', async ({ page }) => {
        await render(page, css);
        expect(await style(page, 'h1', 'margin-top')).toBe('0px');
        expect(await style(page, 'h1', 'font-size')).toBe(await style(page, 'body', 'font-size'));
        expect(await style(page, 'ul', 'list-style-type')).toBe('none');
        expect(await style(page, 'ul', 'padding-left')).toBe('0px');
        expect(await style(page, 'b', 'font-weight')).toBe('400');
    });

    test('applies the modern defaults', async ({ page }) => {
        await render(page, css);
        expect(await style(page, 'p', 'box-sizing')).toBe('border-box');
        expect(await style(page, 'img', 'display')).toBe('block');
    });

    test('hides [hidden]', async ({ page }) => {
        await render(page, css);
        expect(await style(page, '#hidden', 'display')).toBe('none');
    });

    test('loses to unlayered styles when layered', async ({ page }) => {
        const before = '* { margin: 7px; }';
        await render(page, css, { before });
        expect(await style(page, 'p', 'margin-top')).toBe('0px');

        await render(page, compile('@use "index" with ($layer: boot);'), { before });
        expect(await style(page, 'p', 'margin-top')).toBe('7px');
    });

    test('stops transitions under reduced motion', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await render(page, css);
        expect(parseFloat(await style(page, '#animated', 'transition-duration'))).toBeLessThan(0.001);
    });
});


test.describe('normalize', () => {
    test('evens out browser defaults', async ({ page }) => {
        await render(page, compile('@use "normalize";'));
        expect(await style(page, 'body', 'margin-top')).toBe('0px');
        expect(await style(page, 'b', 'font-weight')).toBe('700');
        expect(await style(page, 'summary', 'display')).toBe('list-item');
        expect(await style(page, 'p', 'box-sizing')).toBe('border-box');
        // Browser defaults are kept
        expect(await style(page, 'ul', 'list-style-type')).toBe('disc');
    });
});


test.describe('reboot', () => {
    const css = compile('@use "reboot";');

    test('follows the color scheme', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' });
        await render(page, css);
        expect(await style(page, 'body', 'background-color')).toBe('rgb(255, 255, 255)');

        await page.emulateMedia({ colorScheme: 'dark' });
        expect(await style(page, 'body', 'background-color')).toBe('rgb(33, 37, 41)');
        expect(await style(page, 'body', 'color')).toBe('rgb(222, 226, 230)');
    });

    test('uses logical properties in both directions', async ({ page }) => {
        await render(page, css);
        expect(await style(page, 'ul', 'padding-left')).toBe('32px');

        await render(page, css, { dir: 'rtl' });
        expect(await style(page, 'ul', 'padding-right')).toBe('32px');
        expect(await style(page, 'ul', 'padding-left')).toBe('0px');
    });

    test('shows button state with cursors', async ({ page }) => {
        await render(page, css);
        expect(await style(page, 'button:not([disabled])', 'cursor')).toBe('pointer');
        expect(await style(page, 'button[disabled]', 'cursor')).toBe('not-allowed');
    });

    test('stops transitions under reduced motion', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await render(page, css);
        expect(parseFloat(await style(page, '#animated', 'transition-duration'))).toBeLessThan(0.001);
    });
});


test.describe('print', () => {
    const css = compile('@use "print";');

    test('applies to print only', async ({ page }) => {
        await render(page, `body { color: rgb(200, 0, 0); } ${css}`);
        expect(await style(page, 'p', 'color')).toBe('rgb(200, 0, 0)');

        await page.emulateMedia({ media: 'print' });
        expect(await style(page, 'p', 'color')).toBe('rgb(0, 0, 0)');
        expect(await style(page, 'a', 'content', '::after')).toContain('(');
    });
});
