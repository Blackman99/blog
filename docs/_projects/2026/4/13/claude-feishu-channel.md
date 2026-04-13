---
title: Claude Feishu Channel
description: 将 Claude Code 会话桥接到飞书群聊机器人
date: 2026-04-13
author: Dongsheng Zhao
location: Beijing
tags:
  - Claude
  - Feishu
  - AI
  - TypeScript
categories:
  - AI
  - Back-end
---

> 将 Claude Code 会话桥接到飞书群聊机器人，在飞书中发送消息，Claude 使用完整的工具能力处理后，以交互式卡片的形式将结果流式回传

<!-- more -->

## 介绍

Claude Feishu Channel 是一个将 Claude Code 会话桥接到飞书（Lark）群聊的工具。通过它，你可以直接在飞书群中与 Claude Code 交互，享受完整的 Agent 能力——文件编辑、Shell 命令执行、代码搜索、规划等，所有操作结果都会以交互式卡片的形式实时展示在群聊中

## 特性

- **完整的 Claude Code Agent 能力** - 支持文件编辑、Shell 命令、搜索、规划等全部工具
- **权限审批机制** - 通过飞书交互式卡片进行权限审批，安全可控
- **会话持久化** - 支持进程重启后自动恢复会话
- **消息队列与中断** - 使用 `!` 前缀可中断当前任务并执行新指令
- **流式交互卡片** - 实时展示处理状态、工具调用、思考过程
- **运行时配置** - 通过 `/config set` 命令无需重启即可修改配置

## 安装&使用

```bash
npm install -g claude-feishu-channel
cfc init
vim ~/.claude-feishu-channel/config.toml
cfc
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `/new` | 开始新会话 |
| `/stop` | 中断当前生成 |
| `/status` | 查看会话状态 |
| `/resume <id>` | 恢复之前的会话 |
| `/cd <path>` | 切换工作目录 |
| `/config set <key> <value>` | 运行时修改配置 |
| `!<text>` | 中断并执行新指令 |

## 仓库

[Claude Feishu Channel - GitHub](https://github.com/Blackman99/claude-feishu-channel)
