# github-to-omnifocus

Node-based CLI tool to sync GitHub issues to Omnifocus

## Usage

You must have a project called "GitHub Inbox" inside Omnifocus and a GitHub OAuth token available at `~/.github-to-omnifocus` with the following format:

```yaml
token: <token>
```

```sh
> npm install github-to-omnifocus -g
# then you can run it whenever you want to sync
> github-to-omnifocus
Success - added 30 new isuses to Omnifocus
```

## Acknowledgements

Huge thanks to @jsit for his [OmniFocus 3 AppleScript Guide](https://github.com/jsit/omnifocus-3-applescript-guide)

## License

MIT
