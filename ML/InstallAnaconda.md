# Установка Anaconda


Dock Link - https://cloudlinuxtech.com/install-anaconda-in-ubuntu/#What_is_Anaconda

Вэтом руководстве вы научитесь устанавливать Anaconda в Ubuntu с последней версией пакета Anaconda3 . Это может быть очень полезно, если вы новичок в мире Anaconda и хотите его изучить. Я также подробно рассказал о том, как обновить , удалить и запустить свой первый код на Python и Spyder .

Оглавление
Что такое анаконда?
Скачать Anaconda для Ubuntu Linux
Как установить Anaconda в Ubuntu 20.04
Как запустить Anaconda в Ubuntu с помощью командной строки и графического интерфейса.
Как обновить Anaconda в Ubuntu
Как полностью удалить Anaconda в Ubuntu
Видеоурок
Заключение
Что такое анаконда?
Anaconda (также известная как Anaconda Python ) — это дистрибутив языков программирования Python и R для научных вычислений. Все виды прогнозной аналитики , анализа данных , машинного обучения и обработки больших данных относятся к области научных вычислений.

Это упрощает управление пакетами и развертывание. Anaconda доступна для всех платформ, таких как Windows , macOS и Linux .

Для установки Anaconda в Ubuntu доступны две версии.

Дистрибутивы Anaconda или индивидуальные версии (Individual Edition) — это программы с открытым исходным кодом, которые являются бесплатными.
 Anaconda Team Edition и Anaconda Enterprise Edition являются платными версиями.
В этом руководстве я расскажу об индивидуальной версии Anaconda. Она включает в себя более 250 автоматически установленных пакетов и более 7500 пакетов, доступных в репозитории PyPI.

Conda — это менеджер пакетов с открытым исходным кодом, независимый от языка программирования и работающий на разных платформах. Он помогает управлять пакетами и развертывать их с помощью командной строки, в то время как Anaconda Navigator — это альтернатива с графическим интерфейсом.

Скачать Anaconda для Ubuntu Linux
Существует два способа загрузить Anaconda в Ubuntu:

Вручную, посетив сайт anaconda.com через браузер.
Загрузка Anaconda в терминале Ubuntu с помощью команды Curl.
Шаг 1.1 (Метод 1) – Загрузите Anaconda вручную с помощью браузера.
Перейдите на сайт Anaconda.com > Прокрутите вниз и перейдите в раздел «Установщик Anaconda» > Загрузите установщик Anaconda для Linux с Python 3.8. На момент написания этого руководства используется последняя версия Anaconda — Anaconda3-2020.11 .

После завершения загрузки переместите этот скрипт на свой компьютер с Ubuntu с помощью утилиты WinSCP или SCP .

anaconda-download-in-ubuntu
Или же, чтобы избежать всех проблем, нажмите кнопку «Скачать» .

Скачать установочный файл Anaconda 64-бит (x86) (529 МБ)
Шаг 1.2 (Метод 2) – Загрузите Anaconda с помощью команды curl в Ubuntu.
В Ubuntu для открытия терминала нажмите < Ctrl + Alt + t > .
Сначала обновите репозиторий пакетов Ubuntu.
$ sudo apt-get update
Установите утилиту Curl , если она еще не установлена.
$ sudo apt-get install curl
Загрузите последнюю версию Anaconda3-2020.11-Linux-x86_64 с помощью команды Curl . Замените её на свою версию, если для вашего проекта требуется старая версия Anaconda .
$ curl -O https://repo.anaconda.com/archive/ Anaconda3-2020.11-Linux-x86_64.sh
Эта версия поставляется в комплекте с Python 3.8 . Если вы хотите использовать Python 2.x , скачайте другую версию Anaconda. Перейдите по ссылке в архив , чтобы скачать предпочитаемую вами версию Anaconda.

Шаг 1.3 – Проверка контрольной суммы MD5 для скрипта установки Anaconda.
Это важнейший шаг, который необходимо выполнить для всех ISO- образов, программного обеспечения и скриптов . Особенно, если вы устанавливаете их в Linux.

Совпадение контрольной суммы помогает подтвердить подлинность программного обеспечения. Это также гарантирует, что оно не является вредоносным и безопасно для установки.

Выполните команду md5sum , чтобы получить ключ, связанный со скриптом Anaconda3.
$ md5sum Anaconda3-2020.11-Linux-x86_64.sh
или
$ sha256sum Anaconda3-2025.06-0-Linux-x86_64.sh
В результате будет получена последовательность чисел, как показано на изображении (выделено красным).

Verify-md5checksum-anaconda
Теперь перейдите по ссылке https://repo.anaconda.com/archive/ и найдите свою версию Anaconda в списке. Сравните контрольную сумму MD5, указанную на веб-сайте Anaconda, с вашей версией Anaconda.
Например, в нашем случае совпадение есть. Так что мы можем продолжить установку Anaconda.

Контрольная сумма MD5 на сайте Anaconda
Как установить Anaconda в Ubuntu 20.04
Установить Anaconda в Ubuntu довольно просто, просто следуйте этим шагам:

Шаг 2.1 – Запуск bash-скрипта Anaconda3
Для установки Anaconda в Ubuntu 20.04 вам потребуется запустить скрипт Anaconda3-2020.11-Linux-x86_64.sh .

Для этого перейдите в папку загрузок, где вы сохранили скрипт Anaconda. Затем запустите команду bash , чтобы выполнить скрипт.

Например, я перейду в каталог ~/Downloads , а затем выполню скрипт.

$ cd ~/Downloads 
$ bash Anaconda3-2020.11-Linux-x86_64.sh
установка Anaconda в Ubuntu с помощью скрипта
Нажмите « Enter », чтобы установить Anaconda в Ubuntu Linux.

Шаг 2.2 – Принять лицензионное соглашение с конечным пользователем (EULA)
Введите « да », чтобы принять лицензионное соглашение и продолжить.

Принять лицензию конечного пользователя
Шаг 2.3 – Выберите каталог установки и установите Anaconda3.
На этом экране укажите каталог установки Anaconda в Ubuntu , если хотите. В противном случае, вы можете просто нажать « Enter», чтобы принять значение по умолчанию.

Например, по умолчанию рекомендуемый каталог установки — /home/dev/anaconda3 . Я нажму « Enter », чтобы подтвердить местоположение. Этот же каталог будет использоваться в качестве среды выполнения Anaconda.

Пример выходных данных :

choose-anaconda-installation-directory
Как только вы нажмете « Enter », скрипт выполнит следующие действия и установит Anaconda в Ubuntu 20.04 .

Распаковка посылок
Укажите план добавления или обновления пакета.
Предоставлю вам список новых пакетов, которые будут установлены.
Установите все пакеты и завершите установку Anaconda.
Шаг 2.4 – Инициализация Anaconda3 с помощью команды `conda init`.
На этом этапе просто введите « Да », чтобы разрешить установщику инициализировать Anaconda3, выполнив команду « conda init ».

Пример выходных данных:

Установка Anaconda в Ubuntu
Шаг 2.5 (необязательно) – установите параметр auto_activate_base в значение false.
Если вы хотите, чтобы базовая (корневая) среда conda не активировалась при запуске, просто установите параметр auto_activate_base в значение false с помощью команды conda.

Этот шаг совершенно необязателен и зависит от ваших предпочтений. Если вы решите его отключить, вам придется активировать его каждый раз, чтобы получить доступ к среде Anaconda в терминале.

В этом руководстве по Anaconda я не буду отключать эту функцию.

$ conda config --set auto_activate_base false
Шаг 2.6 – Снова откройте текущую оболочку, чтобы изменения вступили в силу.
Закройте и снова откройте терминал.

Шаг 2.7 – Проверка версии Conda
Чтобы проверить версии Conda , Conda-build и Python , выполните команду « Conda info ». В нашем случае вы увидите, что установлены Conda 4.9.2 и Python 3.8.5 .

$ conda info
Пример выходных данных:

Check-anaconda-version
Поздравляем!! Вы успешно установили Anaconda в Ubuntu.

Оформить заказ – Установка Anaconda на Windows 10
Как запустить Anaconda в Ubuntu с помощью командной строки и графического интерфейса.
When you install anaconda in Ubuntu, you get a lot of bundled scientific packages with it like Spyder, Python and Jupyter notebook.

Anaconda can be run using CLI and GUI both. If you are a CLI (Command Line Interface) fan, you can use Conda to run on the Linux terminal.

In the case of GUI (Graphical User Interface), Anaconda navigator can be used to manage conda packages, environment and launch applications.

I will show you both methods (Conda and Navigator) to create your first program. Just follow along :-

Step3.1 (CLI Method) – Create and Activate Anaconda environment
Let’s create our Test environment and then run our first program in python3.

Step3.1.1 – Create Conda environment
Run the “conda create” command to set up our first test environment (test_env) with python3. It will also install the latest Python 3.9 and Pip 21.0 packages.

$ conda create --name test_env python=3
create-conda-environment
Step3.1.2 – Activate conda environment
Run the “conda activate environment_name“ command and the prompt will change. For example, I am in (test_env) as shown in the image. If you will Execute the conda activate command without environment name. It will drop you in the default base (root) environment.

$ conda activate test_env
conda-activate-environment
Step3.1.3 – Run your first python program
Now run Python and Type print(“your first program“) and check the output.

$ python
# Type your first program code"
>>> print("Welcome to Anaconda! World")
output should be “Welcome to Anaconda! World” as shown in image.

Запустите свою первую программу
Make a note of the Python version. It’s 3.9.2 different than bundled with Anaconda 3.8.5. Press <Ctrl + D> or type exit() to exit from Python shell.

Step3.1.4 – Deactivate Conda environment
To deactivate and come out of the conda test environment. Type this command :

$ conda deactivate
Step3.2 (GUI Method) – Run Python in Spyder IDE using Anaconda navigator
Just to make things interesting, I will show you how to run your first program in Spyder. But this time we will use an Anaconda navigator.

So follow these easy steps –

Step3.2.1 – Launch Anaconda Navigator from base conda environment
Open terminal <Ctrl + Alt + T> in Ubuntu and launch “anaconda-navigator“. Please make sure, you must be in the base conda environment. Otherwise, you will get “anaconda-navigator: command not found“.

$ conda activate
(base) :~/Desktop$ anaconda-navigator
It will launch Anaconda Navigator in Ubuntu.

anaconda-navigator-ubuntu-launcher
Step3.2.2 – Select your test environment (test_env) and install spyder
You can launch Spyder either in the base(root) environment or test_env created in Step3.1.1.

The only difference is, you need to install Spyder first and then you can launch it in your environment. In the base(root) environment, you don’t need to install it.

Select your environment and click on the “install” button in Spyder application.

Install-spyder-software
Please wait and let Spyder installation complete

Ход установки Spyder
Step3.2.3 – Launch Spyder using Anaconda navigator window
Click on Launch button of Spyder application

Запуск Spyder в Ubuntu 20.04
Step3.2.4 – Run your first code in Spyder
Let me show you “How to use Spyder” by running a sample program.

** First Create a new “file” and save it

Select File > New file or Press <Ctrl + N> on your keyboard
Click on File > “Save As” or Press <Ctrl + Shift + S>. Provide a user-friendly file name and save. I will give the name “hello-world”.
If you are a Python programmer or developer. You can write any code you want. But if you are a novice, then you can paste this code as your first program.

# Test Spyder Program
def hello():
    """Print "Hello World" and return None."""
    print("Hello World")

# Main program begins here
hello()
Press <Ctrl + S> to save file again. Now press F5 on your keyboard else click “Run” in the menu and then “Run” again in the drop-down to execute the program.
You can change or Leave <Run settings> default.
Как использовать Spyder Python
Once you will click on “Run“. It will print “Hello World” in output as shown in image.

Python 3.7.9 (tags/v3.7.9:13c94747c7, Aug 17 2020, 18:58:18) [MSC v.1900 64 bit (AMD64)]
Type “copyright”, “credits” or “license” for more information.

IPython 7.21.0 — An enhanced Interactive Python.

runfile(‘C:/terraform/Hello-world.py’, wdir=’C:/terraform’)

Hello World

Run-first-program-in-Spyder-Python
You can install Spyder without Anaconda and also have option to try it online first.

Try Spyder 4 online
How to update Anaconda in Ubuntu
You can update Anaconda old version simply by executing these two steps –

Step4.1- Update conda utility
To update Anaconda in ubuntu to latest version, first update it’s conda utility.

$ conda update conda
Step4.2- Update Anaconda package
Now update Anaconda package using conda command.

$ conda update Anaconda
How to uninstall Anaconda in Ubuntu completely
Follow below mentioned steps to uninstall Anaconda in Ubuntu :-

Step5.1 – Install Anaconda clean package
You can remove or uninstall Anaconda by removing the Anaconda installation directory. But this leaves a residue of anaconda as it’s not recommended procedure.

The anaconda-clean method doesn’t touch your data files in your project folder. Also creates a backup of all Anaconda files and directories in “.anaconda_backup” in your home directory.

To uninstall Anaconda cleanly from ubuntu, Anaconda-clean utility need to be run. So let’s first download Anaconda-clean package.

$ conda install anaconda-clean
Press “y” to install anaconda-clean in ubuntu.

install-anaconda-clean-in-ubuntu
Step5.2 – Clean all Anaconda related files and directories
Now run anaconda-clean utility and it will delete all Anaconda related files and directories for your Ubuntu system.

$ anaconda-clean --yes
Option –yes will help you to delete all files and directories without prompting.
uninstall-anaconda-ubuntu-with-anaconda-clean
Below mentioned are the directories and files exists in backup .anaconda_backup directory created by anaconda-clean utility.

list-anaconda-backup-directory-files
Step5.3 – Delete Anaconda directory using “rm” command
Delete ~Anaconda3 or ~Anaconda2 directory from your system using “rm” command. In my case it’s ~Anaconda3 directory.

$ rm -rf ~/anaconda3
uninstall-anaconda-ubuntu-with-rm-command
Close and open Terminal again.

Step5.4 – Remove Anaconda path variable and “conda init” block
Check your .bash_profile or .bashrc file in your home directory and remove the “conda initialize block” if exist. For example, I will make a copy and then edit the .bashrc file.

# Make a copy of .bashrc file
$ cp .bashrc .bashrc_orig
# Edit file
$ vi .bashrc
Delete this <<<Conda initialize>>> block from .bashrc file and save it.
>>> conda initialize >>>
 !! Contents within this block are managed by 'conda init' !!
 __conda_setup="$('/home/dev/anaconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
 if [ $? -eq 0 ]; then
     eval "$__conda_setup"
 else
     if [ -f "/home/dev/anaconda3/etc/profile.d/conda.sh" ]; then
         . "/home/dev/anaconda3/etc/profile.d/conda.sh"
     else
         export PATH="/home/dev/anaconda3/bin:$PATH"
     fi
 fi
 unset __conda_setup
 <<< conda initialize <<<
Delete-anaconda-variable-path
Restart your terminal and you are done with cleanup of Anaconda3 in Ubuntu.

Video tutorial
Check out this video to install Anaconda in Ubuntu. If you like to watch instead of reading text.



Conclusion
Now you know how to install anaconda in ubuntu and ready to explore the world of scientific computing.

Let me know, do you like installing Spyder or Python with Anaconda or as standalone packages?. Please leave your thoughts in comment.

Further reading – Anaconda
Tags: anaconda for ubuntu, anaconda navigator, anaconda3, conda, download anaconda, How to, latest anaconda, spyder, tutorial, uninstall anaconda
Read more articles
Previous Post
How to install Spyder Python without Anaconda in Windows 10 correctly | {Spyder 4.2.3}
Next Post
How to Install Anaconda on Windows correctly | Anaconda3-2020 Navigator with Python 3.8
Аватар автора публикации
Dev
I'm Dev, your friendly neighbourhood Tech Savy. I spend my days with gadgets, servers, and the occasional laugh-inducing software mishap. Think of me as your tech-savvy, glitch-prone buddy. If you've got questions, feedback, or just need someone to blame when your Wi-Fi goes haywire, I'm your guy!
You Might Also Like
Как правильно установить Python в Linux {Python 3.9 и pip 20.3}
How to install Python in Linux correctly {Python 3.9 and pip 20.3}
January 22, 2021
Как исправить ошибку «Команда Java не найдена» на Mac, Ubuntu или Windows 10
How to fix the “Java command not found” error in Mac, Ubuntu or Windows 10
June 12, 2022
3 простых способа — Как установить PyCharm 2021.1.3 на Ubuntu (графический/командный интерфейс)
3 Easy methods – How to install PyCharm 2021.1.3 on Ubuntu (GUI/CLI)
July 2, 2021
This Post Has 2 Comments

Katie WJune 3, 2021
What if the MD5 does not match? How are we supposed to proceed?


DevJune 3, 2021
Во-первых, если вы скачали библиотеку с anaconda.com, MD5 должен совпадать. Если он не совпадает, это означает, что загрузка не завершена. Пожалуйста, выполните следующие действия:
1) Скачайте библиотеку снова и еще раз проверьте контрольную сумму MD5. Вы также можете проверить SHA-6, если значение MD5 вызывает подозрения. Ссылка на хеши SHA6: «https://docs.anaconda.com/anaconda/install/hashes/all/»
2) Если после нескольких попыток совпадение не удается, попробуйте другую версию и сообщите о проблеме в службу поддержки Anaconda здесь: «https://www.anaconda.com/contact».

Дайте мне знать, если у вас все еще возникнут какие-либо проблемы.

Комментарии закрыты.

Поиск
Поиск
Интересные недавние публикации
Как исправить ошибку «команда jupyter 'jupyter-notebook' не найдена»
Рекомендации Dell EMC PowerFlex (Scale IO) по оптимальной конфигурации – краткое изложение
Рекомендации Data Domain по защите данных: как защитить свои данные с помощью Dell EMC
Как исправить ошибку «команда npm не найдена» в Node.js — 8 решений
Как легко исправить ошибку «команда npm не найдена» с помощью скрипта
Категории
AlmaLinux
AWS
Azure
Браузер
ЦентОС
Разработка
Docker
Федора
LinuxMint
Разное.
Новости
Рокки Линук
Хранилище
Сьюзе
Терраформирование
Поиск неисправностей
Ubuntu
Полезные функции
Виртуализация
Windows
WordPress
Карта сайта CloudlinuxtechАвторские праваОтказ от ответственностиУсловияКонфиденциальностьСвязаться с намиО нас
© Авторские права принадлежат Technology Savy
