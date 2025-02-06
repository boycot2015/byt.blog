---
title: "如何在Mac上新建SSH key"
description: "如何在Mac上新建SSH key的方法，包括生成密钥对、设置密码和添加公钥到远程服务器或平台。通过SSH key进行身份验证可以更安全地进行远程连接和操作。"
publishDate: "2025-02-06T11:23:00Z"
tags: ['ssh']
---

SSH（Secure Shell）是一种加密的网络传输协议，允许用户安全地登录到远程服务器并执行命令。而SSH key则是一对用于身份验证的密钥，包括公钥和私钥。在Mac电脑上新建SSH key是保障远程连接安全的重要步骤。本文将详细介绍如何在Mac上生成SSH密钥对，并将其用于远程连接。

# 一、打开终端

<p>首先，我们需要打开Mac电脑上的终端应用程序。终端是Mac上用于执行命令行指令的工具，它提供了与操作系统底层交互的接口。</p>

# 二、生成SSH密钥对
<p>在终端中，输入以下命令并按Enter键：</p>

```bash
ssh-keygen -t rsa -C "你的邮箱地址"
```
这个命令告诉系统我们要生成一个RSA类型的SSH密钥对。RSA是一种广泛使用的公钥加密算法，用于数据加密和数字签名。

# 三、设置文件名和存储位置

执行上述命令后，系统会提示您输入文件名和存储位置。默认情况下，公钥和私钥文件将保存在用户主目录下的`.ssh/`文件夹中，并且文件名分别为`id_rsa`（私钥）和`id_rsa.pub`（公钥）。如果您不需要更改默认设置，可以直接按Enter键接受。

# 四、设置密码（可选）

<p>接下来，系统会询问您是否要为私钥设置一个密码。这是一个可选步骤，但出于安全考虑，建议设置一个密码。如果设置了密码，每次使用私钥进行身份验证时，都需要输入这个密码。这样可以增加私钥的安全性，防止未经授权的人员使用。</p><p>如果您选择设置密码，请按照提示输入并确认密码。如果您选择跳过此步骤，直接按Enter键即可。</p><h2>五、查看和使用密钥</h2><p>完成上述步骤后，SSH密钥对就已经生成并保存在了指定位置。您可以使用以下命令查看公钥的内容：
  
```bash
cat ~/.ssh/id_rsa.pub
```
执行该命令后，终端将显示公钥的内容。您可以将其复制并分享给需要您SSH访问的服务器或服务。</p><p>私钥文件`id_rsa`应该妥善保管，不要将其泄露给未经授权的人员。私钥用于身份验证，只有持有正确私钥的用户才能通过SSH访问远程服务器。

# 六、添加公钥到远程服务器或平台

如果您需要将生成的公钥添加到某个远程服务器或平台（如`GitHub`），请按照以下步骤操作：</p><ol><li>登录到您需要添加SSH密钥的远程服务器或平台。</li><li>找到SSH密钥的设置部分。不同的平台可能有不同的界面和操作流程，但通常可以在账户设置或安全设置中找到相关选项。</li><li>创建一个新的SSH密钥，并将之前复制的公钥内容粘贴到对应的输入框中。</li><li>保存设置，完成SSH密钥的添加。</li></ol><p>现在，您已经成功在Mac电脑上新建了SSH key，并将其添加到了需要的平台或远程服务器。通过SSH密钥进行身份验证，您可以更安全地进行远程连接和操作。请务必妥善保管您的私钥文件，避免泄露给未经授权的人员。

# 七、替换github源

```bash
# vim ~/.ssh/config 如果没有会自动新建这个文件
Host github.com
  Hostname ssh.github.com
  Port 443
```
### 如果拉取代码提示下面的，说明成功了
```bash
boycott@boycotMac-mini byt.blog-pc % git pull
The authenticity of host 'github.com (127.0.0.1)' can't be established.
ED25519 key fingerprint is xxx.
This key is not known by any other names.
Are you sure you want to continue connecting'

(yes/no/[fingerprint])? yes
# 输入yes，回车即可 
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Already up to date.
```

