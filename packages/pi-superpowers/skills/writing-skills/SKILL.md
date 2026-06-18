---
name: writing-skills
description: 🪨 Create skill files. YAML frontmatter + cavemark body. SKILL.md per dir. Test before deploy.
---

# ✏️ Writing Skills

Create new Pi skills. Caveman style. Follow conventions.

## 📋 Structure

```
skills/<skill-name>/
  SKILL.md         # Required. YAML frontmatter + content
  references/      # Optional. Reference files
  assets/          # Optional. Images, diagrams
```

## 📝 SKILL.md format

```markdown
---
name: <skill-name>
description: <when this fires, what it does>
---

# Skill Title

Content in caveman style. Terse. Emoji. Fragments.
```

## 🎯 YAML frontmatter

- `name`: kebab-case, unique, matches dir name
- `description`: 1 line, when + what. Max 200 chars.

## 📋 Content rules

- Use `<HARD-GATE>` for hard gates
- Use `<EXTREMELY-IMPORTANT>` for critical rules
- Use checklists (`- [ ]`) for processes
- Use tables for comparisons
- Use code blocks for commands
- Caveman tone throughout

## 📋 Name rules

- Kebab-case: `my-skill-name`
- Dir name matches skill name
- `SKILL.md` inside skill dir
- Avoid name collisions with other skills

## 🧪 Test before deploy

1. Does skill load? Check `pi -e .` or `pi install`
2. Does skill trigger correctly? Run scenario
3. Is content accurate? No hallucinations
4. Can agent follow instructions? Test with real query

## 💀 Don't

- Embed agent-specific tool names (use generic actions: "read file", "write code")
- Assume specific harness (Pi, Claude Code, etc.)
- Use "YOU MUST" (use `<EXTREMELY-IMPORTANT>` tag for emphasis)
- Mix multiple unrelated rules in one skill
- Write long prose. Caveman. Terse. Direct.