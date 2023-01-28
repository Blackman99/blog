# My blog site

[![Netlify Status](https://api.netlify.com/api/v1/badges/d5533516-a9aa-4dd0-a323-dcff95c5c73b/deploy-status)](https://app.netlify.com/sites/hopeful-rosalind-548a7c/deploys)

A blog static site using [Vuepress(v1)](https://vuepress.vuejs.org/) and inspired by community theme [vuepress-theme-marker](https://github.com/80maker/vuepress-theme-maker)

## Online Demo

[My blog site](https://blog.donsen.site)

## Install


```sh
# via npm
npm install

# via yarn
yarn

# via pnpm
pnpm install
```

## Dev

```sh
# via npm
npm run dev

# via yarn
yarn dev

# via pnpm
pnpm run dev
```

## Build

```sh
# via npm
npm run build

# via yarn
yarn build

# via pnpm
pnpm run build
```

## songs

songs.yml configuration

* `songUrl` - The song asset url, for example 
* `songId` - The music.163.com music id
* `customLyrics` - Determine whether to use custom lyrics. If set to `true`, `lyrics` should be set
* `lyrics: Array<[number, string]>`  
  Two dimension array  
  Every item should contain a number and a string  
  Number is the seconds of the lyrics content shown time  
  String is the lyrics content  
  Check the songs/songs.yml file for full example
## LICENSE

MIT
