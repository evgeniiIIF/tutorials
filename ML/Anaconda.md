Проверка установки

```bash
conda --version

# Создать новое окружение с Python 3.11
conda create -n my_project python=3.11

# Создать окружение с конкретными пакетами
conda create -n ml_env python=3.10 numpy pandas scikit-learn

# Активировать окружение
conda activate ml_env

# Деактивировать текущее окружение
conda deactivate

# Просмотреть все окружения (звездочкой показано активное)
conda env list
# или
conda info --envs

# Копировать окружение
conda create --clone ml_env --name ml_env_backup

# Удалить окружение
conda remove --name old_env --all
```

# 1. Управление окружениями

Окружения – самое важное в Conda. Они изолируют проекты и их зависимости.

```bash
# Создать новое окружение с Python 3.11
conda create -n my_project python=3.11

# Создать окружение с конкретными пакетами
conda create -n ml_env python=3.10 numpy pandas scikit-learn

# Активировать окружение
conda activate ml_env

# Деактивировать текущее окружение
conda deactivate

# Просмотреть все окружения (звездочкой показано активное)
conda env list
# или
conda info --envs

# Копировать окружение
conda create --clone ml_env --name ml_env_backup

# Удалить окружение
conda remove --name old_env --all
```

# 2. Управление пакетами

```bash
# Установить пакеты в активное окружение

conda install numpy pandas matplotlib
conda install jupyter notebook # для работы с ноутбуками

# Установить конкретную версию

conda install tensorflow=2.10

# Установить из канала conda-forge (часто самые свежие версии)

conda install -c conda-forge lightgbm catboost

# Показать установленные пакеты в текущем окружении

conda list

# Поиск пакета

conda search numpy

# Обновить пакет

conda update numpy

# Удалить пакет

conda remove numpy
```
