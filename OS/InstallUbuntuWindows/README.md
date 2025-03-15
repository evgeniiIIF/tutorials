# Установка Windows 10 и Ubuntu 22.04 на один диск

### 1. Устанавливаем Windows обычной установкой

### 2. Устанавливаем Ubuntu обычной установкой

### 3. Загружаемся в Ubuntu через F9

### 4. Делаем резервную копию загрузчика Windows в папку уровенем выше

```bash
sudo cp /boot/efi/EFI/Microsoft/Boot/bootmgfw.efi /boot/efi/EFI/Microsoft/bootmgfw.efi
```

### 5. Подменяем загрузчик Windows на загрузчик GRUB

```bash
sudo cp /boot/efi/EFI/ubuntu/grubx64.efi /boot/efi/EFI/Microsoft/Boot/bootmgfw.efi
```

### 6. Исправляем ссылку в файле /boot/grub/grub.cfg на загрузчик Windows перенаправляя на резервную копию

```bash
sudo nano /boot/grub/grub.cfg
```

##### Нужно подменить

```md
/EFI/Microsoft/Boot/bootmgfw.efi на /EFI/Microsoft/bootmgfw.efi
```
### Ура готово, теперь при следующей загрузке системы будет загрузчик GRUB предложит две системы на выбор

### Резервный файл загрузчика Windows bootmgfw.efi на всякий случай распологаю в этой папке