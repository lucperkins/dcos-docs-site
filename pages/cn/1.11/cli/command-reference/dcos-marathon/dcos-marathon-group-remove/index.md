---
layout: layout.pug
navigationTitle: dcos marathon group remove
title: dcos marathon group remove
menuWeight: 19
excerpt: 从 DC/OS 中删除 Marathon 应用程序

enterprise: false
---

# 说明
`dcos marathon group remove` 命令允许您从 DC/OS 中删除应用程序。

# 使用

```bash
dcos marathon group remove <group-id> [OPTION]
```

# 选项

| 名称，简写 | 说明 |
|---------|-------------|
| `--force` | 在更新期间禁用 Marathon 中的检查。|

# 位置自变量

| 名称，简写 | 说明 |
|---------|-------------|
| `<group-id>`   |   The group ID. You can view a list of the group IDs with the `dcos marathon group list` 命令。|

# 父命令

| 命令 | 说明 |
|---------|-------------|
| [dcos marathon](/1.11/cli/command-reference/dcos-marathon/) | 将应用程序部署到 DC/OS 并对其进行管理。|

