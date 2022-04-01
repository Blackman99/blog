---
title: 为什么每个Vue的开发者应该为Quasar1.0的到来而高兴
description: 为什么每个Vue的开发者应该为Quasar1.0的到来而高兴
categories: 
  - Front-end
tags: 
  - Vue
  - Quasar
author: Zion Dotson
date: 2019-12-20
location: Beijing
---

原文地址：[《Why every Vue developer should be excited by Quasar 1.0》](https://medium.com/quasar-framework/quasar-1-0-4bc696d60c1b)

> 今天，我们正在发布第一个稳定发行版的Quasar：一个功能齐全、可扩展的开源框架，建立在非常流行的VueJS之上，利用了Node、Webpack和Babel的强大功能。

<!-- more -->

## 在我讨论细节之前，让我倒回去一点，告诉你们我的故事

* 几年前，我和你们很多人现在的处境一样——在一个大型的企业世界里工作——厌倦了职场的尔虞我诈，争权夺利。我越来越为使用企业的的工具相互冲突、操作不一致而烦恼，我渴望一个更简单的生活，在那里我可以发挥我的编程技巧，并完成有意义的，值得付出的项目，这些项目可以一定程度上影响世界。
* 回到2015年，我正在使用不断更新的不同的软件工具去创建不同类型的新项目，这些项目是被现代社会所需要的...IOS应用，Andriod应用，web应用，网站，windows桌面应用，Apple桌面应用，渐进式应用...
* 每个独立的应用程序都需要一组特定的、独特的工具来进行设计、开发和构建，但我仍然梦想着能有一个工具能够取代他们所有
* 我渴望有一个单一的框架来<b>消除所有的复杂性</b>，<b>从同一个代码库</b>制作所有这些不同风格的程序
* 由于无法找到这样一个理想的工具，我决定创建它
* 这是一项浩大的工程。从零开始，我知道我需要将它建立在一个强大的核心框架之上，这个框架可以很容易地扩展和增强，从而生成我所设想的全面系统
* 就在这时，Vue.js开始出现在人们的视野中。在浏览了其结构、开发路径和可扩展性之后，我觉得它将为我计划构建的新框架提供完美的基础，并在开发周期中节约大量时间。
* 这就是Quasar框架诞生的美丽时刻

## Quasar是什么

* Quasar框架的理念是<b>一组用于构建现代应用程序的全面组件</b>，从像对话框、按钮、输入框、标签页、面板、工具提示、工具栏、徽章、日期选择器、颜色选择器、图标选择器、卡片、头像、横幅、纺纱器这类<b>单一基础组件</b>到<b>更加高级的组件</b>，如：聊天信息盒、活动时间线、数据表格、日历、视频播放器、wysiwyg富文本编辑器、飞入面板、条形栏等等
* 这些组件全都是基于Vue.js进行开发的，使得它们的使用方式对于需要一个易扩展，易用的组件系统来扩展他们的项目的数量庞大的<b>Vue开发者</b>来说是<b>完全熟悉的</b>
* 根据今天发布的全新的版本1.0，<b>Quasar包含了123个组件</b>，由于内置了用于<b>自定义组件创建</b>的系统，这个数字还在不断增加
* Quasar还提供了<b>可以应用于生产环境的应用程序</b>所需的构建系统，只需要一个简单的命令行
* <b>在全局安装了Quasar依赖并创建了新项目之后，实际上，只需要一行代码就能够</b>构建一个可以应用于生产环境的IOS应用、Android应用、Windows桌面应用、MacOS桌面应用或者是Linux桌面应用，这些应用全部都是从同一个代码库构建

```sh
$ quasar build
```

* <b>忽略Webpack、Babel、树摇优化、以及打包优化的技巧复杂性</b>，这些都已经被高度包装，隐藏在各种场景之下，并为你做了自动配置。同时，如果你觉得有必要，<b>始终保留您介入并定制流程的完整能力</b>
* 这是以一种你从未想象过的简化和加速开发过程的方式封装的强大功能和可扩展性

### Quasar已经渡过了艰难的成长期

* 早期版本需要进行许多更改，而且通常是重大改变，我肯定这些改变惹恼了我们的许多早期使用者，但是当我们不断地开发这个广泛的系统时，这些是必须经历的痛苦。
* 版本0.13, 0.14, 0.15, 0.16 一直到 0.17都是在对Quasar进行不断的提炼，到0.17版，终于有了一个合适的结构，可以形成一个稳定的基础，不需要将来进行破坏性的更改就可以增长和扩展
* 因此，我们决定冻结开发，并进行完整的重构来组织和优化我们所创建的内容
* 注意，我说“我们”是因为，在这个时候，我已经意识到这将是一个非常艰难的任务，一个人肯定是无法完成的，所以我招募了一个<b>核心团队</b>去协作管理开发
* 刚开始第一个开发者加入了，然后是第二个，第三个，然后形成了我们现在的八个人组成的核心开发团队，<b>每个人都是经验丰富的开发人员，拥有与其他开发人员互补的技能集。</b>
* 他们得到了更多的志愿者的支持，这些志愿者负责客户支持、文档、媒体等工作
* 还有一个活跃的友好开发者社区，所有人都愿意分享和贡献他们的知识和建议，帮助大家共同成长和发展
* 我喜欢把这看作是<b>我们的大家庭</b>——所有人都因一个共同的目标而相聚，<b>互相帮助</b>，互相推动以达到新的令人兴奋的成就。
* 版本1.0是一个巨大的飞跃，团队和所有优秀的开源贡献者投入了大量的时间和精力。
* 自从我们决定封闭0.x版本的开发分支之后，在Quasar的产生和重写上，已经投入了4000多个开发小时。
* 此外，在整个5个月的公开测试版和发布候选过程中，我们高度投入的用户社区一直积极参与代码的完善，这才换来了一个经历了许多考验的测试版本
* 今天发布的<b>v1Quasar稳定版本</b>是Quasar发展史上的一个<b>重要里程碑</b>，但这只是我们<b>为未来计划</b>的更伟大的事情的垫脚石
* 这个版本的设计考虑到了灵活性和可扩展性，但我们已经有了一个重要的路线图来确定Quasar的发展方向，其中包括几个主要的新构建目标，如浏览器扩展、Webview和电容器。
* 我们需要重新编写主要的系统和过程，使Quasar能够成长，并在未来几年保持相关性，不需要在将来进行重大的突破性更改。
* 所以，只要你是一个Vue开发者，或者即使是非Vue开发者，只要是有意愿参与以下几件事：

> * 简化组件的使用
> * 简化构建和打包过程
> * 使得构建目标可以在任何类别的操作系统上运行


* 那么这个<b>最新的Quasar发行版就是你不能忽视的</b>

### 你现在可以做些什么来了解更多

* 本文仅触及Quasar框架的能力的表面

* 有很多特性和重要的方面我没有时间在这里提到，所以在接下来的几周，我将发表一系列文章，详细介绍Quasar框架的各个特性和概念，请注意它们。

* 与此同时，我们在<b>[Forum](https://forum.quasar-framework.org/)</b>和<b>[Discord](https://chat.quasar.dev/?source=post_page---------------------------)</b>都有一个积极友好的社区，欢迎您的到来

* 有<b>[详细的文档和示例](https://quasar.dev/start?source=post_page---------------------------)</b>可以帮助您入门

* 一个庞大的<b>[组件库](https://quasar.dev/vue-components/uploader?source=post_page---------------------------)</b>，随时可以直接投入到您现有的或新的项目中

* 共享代码的好方法，比如预配置<b>[CodeSandbox](https://codesandbox.quasar.dev/?source=post_page---------------------------)</b>、<b>[jsFiddle](https://jsfiddle.quasar.dev/?source=post_page---------------------------)</b>或<b>[Codepen](https://codepen.quasar.dev/?source=post_page---------------------------)</b>

* 一个<b>[易于使用的构建过程](https://quasar.dev/quasar-cli/cli-documentation/build-commands?source=post_page---------------------------)</b>，完全可配置(尽管在99%的情况下，您甚至不需要接触它)，遵循所有最新和<b>最佳web实践</b>

* 在30秒内开启你的<b>[单页应用](https://quasar.dev/quasar-cli/developing-spa/introduction?source=post_page---------------------------)</b>、<b>[渐进式](https://quasar.dev/quasar-cli/developing-pwa/introduction?source=post_page---------------------------)</b>、<b>[服务端渲染](https://quasar.dev/quasar-cli/developing-ssr/introduction?source=post_page---------------------------)</b>、<b>[移动APP](https://quasar.dev/quasar-cli/developing-mobile-apps/introduction?source=post_page---------------------------)</b>以及<b>[桌面应用](https://quasar.dev/quasar-cli/developing-electron-apps/introduction?source=post_page---------------------------)</b>吧！（是的，想要开始就是这么简单！）

### 为什么不加入我们呢？

* 所以，来吧，给Quasar一个机会，<b>加入我们的家庭</b>，<b>享受我们的团队和社区的支持</b>，热情友好的开发人员，他们每天都喜欢使用Quasar

* 更多信息: [https://quasar.dev](https://quasar.dev/?source=post_page---------------------------)

* GitHub: [https://github.com/quasarframework/quasar](https://github.com/quasarframework/quasar?source=post_page---------------------------)

* Newsletter: [https://quasar.dev/newsletter](https://quasar.dev/newsletter?source=post_page---------------------------)

* 快速开始: [https://quasar.dev/start](https://quasar.dev/start?source=post_page---------------------------)

* 聊天服务: [https://chat.quasar.dev/](https://chat.quasar.dev/?source=post_page---------------------------)

* 论坛: [https://forum.quasar.dev/](https://forum.quasar.dev/?source=post_page---------------------------)

* Twitter: [https://twitter.com/quasarframework](https://twitter.com/quasarframework?source=post_page---------------------------)

* 赞助: [https://donate.quasar.dev](https://donate.quasar.dev/?source=post_page---------------------------)
