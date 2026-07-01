import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const brandsTabCss = readFileSync(
  new URL('../../src/components/BrandsTab.module.css', import.meta.url),
  'utf8',
);

function cssDeclarations(css: string, selector: string): string {
  const blocks: string[] = [];
  const rulePattern = /([^{}]+)\{([^}]*)\}/g;
  const cssWithoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let match: RegExpExecArray | null;
  while ((match = rulePattern.exec(cssWithoutComments)) !== null) {
    const selectors = (match[1] ?? '').split(',').map((item) => item.trim());
    if (selectors.includes(selector)) blocks.push(match[2] ?? '');
  }
  if (blocks.length === 0) throw new Error(`Missing CSS block for ${selector}`);
  return blocks.join('\n');
}

function ruleValue(block: string, property: string): string {
  const matches = [...block.matchAll(new RegExp(`(?:^|[;\\n])\\s*${property}:\\s*([^;]+);`, 'g'))];
  const match = matches.at(-1);
  if (!match) throw new Error(`Missing CSS property ${property}`);
  return match[1]!.trim();
}

describe('BrandsTab sidebar styles', () => {
  it('keeps the search and action controls fixed while the list scrolls internally', () => {
    const sidebar = cssDeclarations(brandsTabCss, '.sidebar');
    const list = cssDeclarations(brandsTabCss, '.list');

    expect(ruleValue(sidebar, 'display')).toBe('flex');
    expect(ruleValue(sidebar, 'flex-direction')).toBe('column');
    expect(ruleValue(sidebar, 'overflow')).toBe('hidden');
    expect(ruleValue(list, 'flex')).toBe('1 1 auto');
    expect(ruleValue(list, 'min-height')).toBe('0');
    expect(ruleValue(list, 'overflow-y')).toBe('auto');
  });
});
