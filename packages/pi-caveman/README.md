# 🪨 pi-caveman

**Why use many token when few do trick.**

A [pi](https://github.com/mariozechner/pi) extension that cuts **~75% of output tokens** while keeping full technical accuracy. Forked from [jonjonrankin/pi-caveman](https://github.com/jonjonrankin/pi-caveman), based on [caveman](https://github.com/JuliusBrussee/caveman) by [Julius Brussee](https://github.com/JuliusBrussee).

**New: "mixed" level** — emoji, symbols, and Dutch/French/German words to shorten things even more. 🇳🇱🇫🇷🇩🇪

<table>
<tr>
<td width="50%">

### 🗣️ Normal (69 tokens)

> "The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object."

</td>
<td width="50%">

### 🪨 Caveman "mixed" (19 tokens)

> "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."

</td>
</tr>
</table>

## Install

```bash
pi install npm:pi-caveman
```

## Usage

### Toggle Mode

```
/caveman              Toggle on (full) / off
/caveman lite         Professional, no fluff
/caveman full         Classic caveman (default)
/caveman ultra        Maximum compression
/caveman mixed        Caveman with emoji + 🇳🇱/🇫🇷/🇩🇪 words
/caveman wenyan-lite  Semi-classical Chinese
/caveman wenyan       Full 文言文
/caveman wenyan-ultra Extreme 文言文
/caveman micro        Experimental prompt-minimized mode
/caveman off          Disable
/caveman stop         Disable (alias)
/caveman quit         Disable (alias)
```

### Settings

```
/caveman config       Open settings dialog
```

## Levels

| Level | Style | Example |
|---|---|---|
| **Lite** | No filler. Full sentences. Professional but tight. | "Your component re-renders because you create a new object reference each render." |
| **Full** | Drop articles, fragments OK. Classic caveman. | "New object ref each render. Wrap in `useMemo`." |
| **Ultra** | Abbreviations, arrows, maximum compression. | "Inline obj prop → new ref → re-render. `useMemo`." |
| **Mixed** 🆕 | Full caveman + emoji, 🇳🇱/🇫🇷/🇩🇪 words. | "Bug in auth middleware. Token expiry check use `<` not `<=`. 🇩🇪 Fix: `<=`." |
| **文言文 Lite** | Semi-classical Chinese, grammar intact. | "組件頻重繪，以每繪新生對象參照故。" |
| **文言文** | Full classical terseness. | "物出新參照，致重繪。useMemo Wrap之。" |
| **文言文 Ultra** | Extreme classical compression. | "新參照→重繪。useMemo Wrap。" |
| **Micro** _(experimental)_ | Minimal prompt that reduces size of caveman prompt itself. | "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:" |

## Mixed Level — Our Flavor

The `mixed` level adds to classic caveman:

> Emoji, symbols, and foreign words (Dutch, French, German) welcome to shorten things. Use 🇳🇱/🇫🇷/🇩🇪 words or 🧠⚡🔧 when they save keystrokes.

Examples:
- "Klaar" instead of "done" 
- "Voilà" instead of "there you go"
- "Genau" instead of "exactly"
- 🪨⚡💀 for emphasis

## How It Works

The extension hooks `before_agent_start` to append caveman communication rules to the system prompt at the selected intensity. Auto-clarity rules tell the model to drop caveman mode for security warnings or irreversible actions.

## Credits

Forked from [jonjonrankin/pi-caveman](https://github.com/jonjonrankin/pi-caveman). Based on [caveman](https://github.com/JuliusBrussee/caveman) by [Julius Brussee](https://github.com/JuliusBrussee). `micro` mode based on [caveman-micro](https://github.com/kuba-guzik/caveman-micro) by [Kuba Guzik](https://github.com/kuba-guzik).

## License

MIT