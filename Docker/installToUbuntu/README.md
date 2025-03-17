# Установка докер на Ubuntu 22.04

### 1. Необходим gnome-terminal

```bash
sudo apt install gnome-terminal
```

### 2. Настройте репозиторий пакетов Docker.

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

### 3. Загрузите последнюю версию пакета DEB с официального сайта https://www.docker.com/

### 4. Установите пакет с помощью apt следующим образом:

```bash
sudo apt-get update
sudo apt-get install ./docker-desktop-amd64.deb
```

#### Примечание: В конце процесса установки aptвыдает ошибку из-за установки загруженного пакета. Вы можете игнорировать это сообщение об ошибке.

```md
N: Download is performed unsandboxed as root, as file '/home/user/Downloads/docker-desktop.deb' couldn't be accessed by user '\_apt'. - pkgAcquire::Run (13: Permission denied)
```
