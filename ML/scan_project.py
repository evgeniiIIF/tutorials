#!/usr/bin/env python3
"""
scan_project.py - Генератор контекста проекта
"""

import os
from pathlib import Path

# ============================================================================
# НАСТРОЙКИ (редактируйте здесь)
# ============================================================================

# Файлы, которые НЕ показываем (ни в структуре, ни в содержимом)
IGNORE_FILES = {
    "scan_project.py",      # этот файл
    "__init__.py",          # служебный файл Python
    "project_context.txt",  # файл вывода
    "package-lock.json"
}

# Папки, которые НЕ показываем
IGNORE_DIRS = {
    "__pycache__",
    ".git",
    ".venv", "venv", "env",
    "node_modules",
    "onnx_model"
}

# Расширения файлов, для которых ВЫВОДИМ содержимое
# Добавляйте расширения, которые нужны вашему проекту
SHOW_CONTENT = {
    ".py",   # Python
    ".env",  # environment files
    '.json',
    '.txt',
    '.yml',
    ".js",
    ".ts",
    "tsx",
    # добавьте при необходимости:
    # ".js", ".ts", ".html", ".css", ".md", ".json"
}

# ============================================================================
# ОСНОВНАЯ ФУНКЦИЯ
# ============================================================================


def generate_context():
    """Генерирует контекст проекта"""

    root = Path(".").resolve()
    output_file = "project_context.txt"

    with open(output_file, "w", encoding="utf-8") as f:

        # 1. Структура проекта
        f.write("СТРУКТУРА ПРОЕКТА:\n")
        f.write("=" * 50 + "\n\n")

        # Рекурсивно обходим директории
        for dirpath, dirnames, filenames in os.walk(root):
            # Фильтруем игнорируемые папки
            dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]

            # Относительный путь от корня
            rel_dir = Path(dirpath).relative_to(root)
            indent = "    " * len(rel_dir.parts)

            # Выводим директорию (если не корневая)
            if rel_dir != Path("."):
                dir_name = rel_dir.parts[-1]
                if dir_name not in IGNORE_DIRS:
                    f.write(f"{indent}{dir_name}/\n")

            # Выводим файлы
            for filename in filenames:
                # Пропускаем игнорируемые файлы
                if filename in IGNORE_FILES:
                    continue

                # Выводим ВСЕ файлы в структуре (кроме игнорируемых)
                f.write(f"{indent}    ├── {filename}\n")

        f.write("\n" + "=" * 50 + "\n\n")

        # 2. Содержимое файлов
        f.write("СОДЕРЖИМОЕ ФАЙЛОВ:\n")
        f.write("=" * 50 + "\n\n")

        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]

            for filename in filenames:
                # Пропускаем игнорируемые файлы
                if filename in IGNORE_FILES:
                    continue

                filepath = Path(dirpath) / filename

                # Проверяем, нужно ли выводить содержимое
                # Учитываем как расширения, так и точные имена файлов
                file_ext = filepath.suffix.lower()
                should_show = file_ext in SHOW_CONTENT or filename in SHOW_CONTENT

                if should_show:
                    try:
                        # Читаем файл
                        with open(filepath, "r", encoding="utf-8") as file:
                            content = file.read()

                        # Относительный путь
                        rel_path = filepath.relative_to(root)

                        # Записываем
                        f.write(f"{rel_path}\n")
                        f.write("-" * len(str(rel_path)) + "\n")
                        f.write(content + "\n\n")

                    except UnicodeDecodeError:
                        # Пропускаем бинарные файлы
                        pass
                    except Exception:
                        # Пропускаем файлы с ошибками
                        pass

# ============================================================================
# ЗАПУСК
# ============================================================================


if __name__ == "__main__":
    print("Генерация контекста проекта...")
    generate_context()
    print("Готово! Результат в project_context.txt")
