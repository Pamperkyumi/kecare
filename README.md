# Kecare

English | [简体中文](./README.zh-CN.md)

Kecare is a static site generator for multilingual content sites. You write Markdown in `.kecare/articles/`; the build translates it, renders it, and hands finished pages to whatever file-routing framework your theme ships with — Nuxt by default, but the output doesn't care. The generator and the site framework stay separate on purpose: content belongs to you, the pipeline belongs to Kecare, the presentation layer belongs to the theme.

Think of it as a compiler. Markdown in, pages out — the renderer is just the host.

## Why Kecare

**Translation is a build step, not a runtime widget.** Put `translate: ['zh-CN', 'en-US', 'ja-JP']` in your front matter and the build calls an OpenAI- or Anthropic-compatible API to translate the article. Each language gets real URLs with real HTML, which search engines like better than a language toggle in the browser. A two-layer cache keeps the bills sane: a content-hash manifest skips untouched articles entirely, and paragraph-level caching means editing one paragraph only re-translates that paragraph. Code blocks are masked with placeholders before anything leaves the machine. Failed calls fall back to the original text and are never cached, so a flaky network doesn't permanently degrade a translation.

**Themes are projects, and templates are TypeScript.** A theme is a complete Nuxt project with its own dependencies and components. The Kecare-specific part is a handful of files in `.kecare/`:

| File | Called |
| --- | --- |
| `*.article.ts` | once per article variant |
| `*.list.ts` | once after all articles, receives the full record |
| `*.archives.ts` | once, receives archive data |
| `*.menu.source.ts` | once, before articles — link names become hash links |

Each template exports a `generator` function that receives typed data and returns `{ urlPath, fsPath, template }`. Where pages live, how they're routed, what's in them — that's your code, not a config dialect. Several `*.article.ts` templates produce several output files per article, and every one of them is tracked, so cache rebuilds and `clean` never miss a file.

**Builds are incremental and deterministic.** Same input, byte-identical output — article data is collected once and sorted by path and language before any view is derived, so nothing depends on concurrent completion order. Unchanged articles skip parsing and translation. In `dev` mode Kecare watches `.kecare/articles/`, regenerates only what changed, and writes pages straight into Nuxt's route directory; Vite's HMR takes it from there. Deleted or hidden articles have their pages pruned automatically.

**Problems surface before the build, not during it.** `kecare check` loads your templates, dry-runs them with minimal data, scans every article's front matter (cached or not — the build itself skips validation on cache hits), and validates your config. It runs in seconds, writes nothing, calls no APIs, and exits non-zero when something is off, so it slots into CI or a pre-commit hook. When `gen` does fail, it points you at `check`.

**Cleanup is tracked, not guessed.** Every file the generator writes lands in a product registry. `kecare clean` deletes exactly those files plus the search index and caches, then removes the empty directories left behind — no hardcoded paths, no orphans.

Also in the box: KaTeX and tab groups in the Markdown pipeline, a built-in search index, per-language article stats for list and archive templates, and a small browser SDK (tabs, Shiki highlighting, copy buttons, TOC, language switching) so themes don't each rebuild the same article-page plumbing. The CLI ships as standalone per-platform binaries via `create-kecare`, so a content site needs no generator dependencies in its `package.json`.

## Quick start

```bash
bun install

# generate the example theme
bun run gen

# watch mode: regenerate on save, wired to Nuxt HMR
bun run dev

# lint templates + front matter + config before committing
bun run ./projects/generator/index.ts check projects/theme

# remove generated files and caches
bun run clean
```

Unit tests: `bunx vitest run --config projects/generator/vitest.config.ts`.

Requirements: Bun >= 1.2, Node.js >= 20 (for the Nuxt theme).

## CLI

```bash
bun run ./projects/generator/index.ts <command> <project-path> [options]
```

| Command | Description |
| --- | --- |
| `gen` | Scan articles and generate all pages |
| `dev` | Incremental generation + file watching, wired to Nuxt HMR (`--with-nuxt` to also start `nuxt dev`) |
| `check` | Fast lint of template contracts, front matter, menus and config — no writes, no API calls, non-zero exit on problems |
| `init` | Initialize a project from a template |
| `clean` | Remove generated files and caches based on the product registry |
| `version` / `help` | Version info and command help (`--help, -h` on any command) |

## Writing articles

Articles are Markdown files under `<theme>/.kecare/articles/`:

```markdown
---
title: My post            # optional — falls back to the filename
menu: docs                # optional — groups the post under a menu
date: 2026-01-01          # required, YYYY-MM-DD
translate:                # first entry is the source language
  - zh-CN
  - en-US
  - ja-JP
---

Body text...
```

Optional fields: `desc`, `cover`, `tags`, `sticky`, `author`, `layout`, `hidden`.

## A template, concretely

```ts
// .kecare/foo-bar.article.ts
import { join } from 'node:path';
import type { ArticleVariant, KecareContext } from 'kecare';

export async function generator(context: KecareContext, article: ArticleVariant) {
    return {
        urlPath: `articles/${article.lang}/${article.hash}`,
        fsPath: join(context.projectPath, 'app/pages/articles', article.lang, `${article.hash}.vue`),
        template: `<template>...</template>`,
    };
}
```

All language variants of an article share one short hash of its path, so URLs look like `articles/en-US/fcc31e3f` and the mapping between languages is predictable.

## Repository layout

```
Kecare/
├── packages/
│   ├── kecare/           # core package: shared types + browser SDK (published to npm)
│   └── create-kecare/    # scaffolding: installs the standalone CLI (published to npm)
├── projects/
│   ├── generator/        # the generator: CLI commands, input drivers, module handlers
│   ├── theme/            # official example theme (Nuxt app, articles live in .kecare/articles)
│   └── test/             # end-to-end fixtures
├── .commands/            # repo helper scripts (CI publishing)
├── Publish.ts            # interactive release script (version, tag, push)
└── kecare-zh-cn.dockerfile
```

> `projects/kecare-template-nuxt` is a submodule (not initialized by default). To modify the template, run `git submodule update --init projects/kecare-template-nuxt` first.

## Publishing

- Run `bun run Publish.ts`: bump the version interactively, generate the commit message, tag and push, then sync the theme repo.
- Pushing a tag triggers GitHub Actions (`.github/workflows/publish.yml`), which publishes the npm packages (`kecare`, `create-kecare`, and the per-platform `@kecare/*` binaries).

## License

See [LICENSE](./LICENSE).
