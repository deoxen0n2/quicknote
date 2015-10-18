# quicknote

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Quickly note something from your terminal.

## Install

```bash
$ npm install -g quicknote
```

## Usage

```bash
$ quicknote "Sample quick note"
$ quicknote "Sample quick note 2"
```

To list all notes:

```bash
$ quicknote -s
$ All notes:
$   [1] Sample quick note
$
$   [2] Sample quick note 2
```

And to delete note:

```bash
$ quicknote -r 1
$ quicknote -s
$ All notes:
$   [1] Sample quick note 2
```

Help:

```bash
$ quicknote -h
$ Usage:
$   ...
```

## What about a longer note?

Sure.

```bash
$ quicknote -e
```

This will open your `$EDITOR` (normally `vi` on most systems) and when finish editing it will go into your quicknote database.

## Can I pipe to it?

Why not.

```bash
$ echo "Sample quick note" | quicknote
```

## But `quicknote` is too long

Do yourself a flavour, put this in your `.bashrc` or `.zshrc` or whatever:

```bash
alias qn=quicknote
alias qns="quicknote -s"
alias qnr="quicknote -r"
alias qne="quicknote -e"
```

## How can I find quicknote database

It resides in `~/.quicknote/db.json`. Just a simple JSON. You can even edit it directly or make a program (or extend this) to read and output more beautiful notes, for example.

## License

MIT. Copyright (c) Saran Siriphantnon.
