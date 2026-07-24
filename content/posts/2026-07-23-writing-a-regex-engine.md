---
title: What I learned writing a regex engine from scratch
date: 2026-07-23
description: Building RegexInt taught me more about regular expressions than a decade of calling .match() ever did.
tags: [TypeScript, Parsing]
author: Sam
draft: false
---

I've used regular expressions for years without knowing what happens between
passing a pattern and getting a match back. So I wrote
[RegexInt](https://github.com/Forworddash/RegexInt), a small PCRE-style engine in
TypeScript, to find out.

The pipeline is short enough to hold in your head:

```
pattern string ──▶ Parser ──▶ AST ──▶ Matcher ──▶ MatchResult
```

## Precedence falls out of the grammar

The thing that clicked first: alternation binding loosest and quantifiers
binding tightest isn't a rule the engine checks. It's a consequence of how the
recursive-descent parser is layered. `parseAlternation` calls `parseSequence`,
which calls `parseQuantifier`, which calls `parseAtom`. Each level only knows
about the one below it, and precedence emerges from the nesting.

That's why `a|bc` is `a` or `bc` rather than `ab` or `ac` — the alternation
layer never sees individual characters at all.

## Backtracking is just continuations

The matcher takes a continuation: "match this node, then call `k` with wherever
you ended up." A greedy `*` tries the longest match first, and if the
continuation fails, it gives back one character and tries again.

Once you see it that way, catastrophic backtracking stops being mysterious.
Nested quantifiers like `(a+)+b` against a string of `a`s force the engine to
try every possible split of the input, and there are exponentially many.

Reading ~500 lines of this is worth more than any explanation of why your
production regex hung the server.
