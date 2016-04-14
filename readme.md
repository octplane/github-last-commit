# Github last commit Chrome extension

Install at: https://chrome.google.com/webstore/detail/github-link-uberizer/ijlebfifaaokdkglnokndelloojcieoc

![This is how it looks](https://raw.githubusercontent.com/octplane/github-last-commit/master/assets/example1.png)

# Feature

- show the last activity visually in front of a github link (red, not very active, yellow, a bit, blue was active recently)
- shape is for popularity: the starier it is, the more popular the repository is. The rounder it is, the less popular.

# Developers

- Install `src` using developer tools in chrome. Generate token at Github and update its value in options panel.

# Inspiration and thanks

- @ydegat and our discussion around the nice and oldish https://github.com/veggiemonk/awesome-docker
- @kali for directing me at the Trump-Filter
- https://github.com/RobSpectre/Trump-Filter for the inspiration.

# TODO

- [x] Work with day count instead of ugly IndexOf
- [x] Use Github API (requires login and access token, now)
- [x] Find better way to find the info than hammering Github.
- [x] ~~Reinstate Analytics~~ Remove Analytics
- [x] Publish on Chrome Store https://chrome.google.com/webstore/detail/github-link-uberizer/ijlebfifaaokdkglnokndelloojcieoc !
- [x] ~~Display stargazers count~~ More or less
- pre install bullets to avoid view dilation when ajax is running
- Cache result for ~~at least 5 minutes~~ 60 minutes
- :question: Display found repositories in popup
- Option Panel
- ~~have the ability to find most recent branch~~
