# Github last commit Chrome extension

![This is how it looks](https://raw.githubusercontent.com/octplane/github-last-commit/master/assets/example1.png)

Install `src` using developer tools in chrome. Generate token at Github and update its value in options panel.

# Inspiration and thanks

- @ydegat and our discussion around the nice and oldish https://github.com/veggiemonk/awesome-docker
- @kali for directing me at the Trump-Filter
- https://github.com/RobSpectre/Trump-Filter for the inspiration.

# TODO

- [x] Work with day count instead of ugly IndexOf
- [x] Use Github API (requires login and access token, now)
- [x] Find better way to find the info than hammering Github.
- [x] ~~Reinstate Analytics~~ Remove Analytics
- Cache result for ~~at least 5 minutes~~ 60 minutes
- Display stargazers count
- :question: Display found repositories in popup
- Option Panel
- ~~have the ability to find most recent branch~~
