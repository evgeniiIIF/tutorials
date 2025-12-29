# PyTorch полный курс

### Аксон и дендрит – это отростки нейрона

Дендриты: дендриты принимают сигналы и несут их к телу нейрона.(много отростков)
Аксон: передает сигналы от тела клетки. (обычно один)

# Тензоры

## Важно

Методы с нижним подчеркиванием в конце:

method\_ - inplace (mutable) методы, изменяющие текущий тензор, не создают нового;
method - immutable методы не меняют текущий тензор, формируют новый;

Пример:

```python
y = torch.FloatTensor(2, 3)  # Мусорные значения
y.fill_(3.14)  # Заполняем 3.14
print("y:", y)
# Изменяет тензор!!!
# tensor([[3.1400, 3.1400, 3.1400],
#         [3.1400, 3.1400, 3.1400]])

```

## Создание тензеров через конструкторы

```python
import torch

# 1. torch.FloatTensor() - 32-битные числа с плавающей точкой
torch.FloatTensor([1, 2, 3])           # 1D: [1., 2., 3.]
torch.FloatTensor([[1, 2], [3, 4]])    # 2D: 2x2 матрица
torch.FloatTensor(2, 3)                # 2x3 с мусорными значениями
torch.FloatTensor(2, 3, 4)             # 3D: 2x3x4 тензор

# 2. torch.DoubleTensor() - 64-битные числа с плавающей точкой
torch.DoubleTensor([1, 2, 3])          # 1D
torch.DoubleTensor(3, 4)               # 3x4 матрица

# 3. torch.HalfTensor() - 16-битные числа с плавающей точкой
torch.HalfTensor([1, 2, 3])            # 1D
torch.HalfTensor(2, 2)                 # 2x2 матрица

# 4. torch.ByteTensor() - 8-битные беззнаковые целые
torch.ByteTensor([1, 0, 1])            # 1D булевые значения
torch.ByteTensor(2, 3)                 # 2x3

# 5. torch.CharTensor() - 8-битные знаковые целые
torch.CharTensor([-1, 0, 1])           # 1D
torch.CharTensor(3, 2)                 # 3x2

# 6. torch.ShortTensor() - 16-битные знаковые целые
torch.ShortTensor([1, 2, 3])           # 1D
torch.ShortTensor(2, 2, 2)             # 2x2x2

# 7. torch.IntTensor() - 32-битные знаковые целые
torch.IntTensor([1, 2, 3])             # 1D
torch.IntTensor(4, 3)                  # 4x3

# 8. torch.LongTensor() - 64-битные знаковые целые
torch.LongTensor([1, 2, 3])            # 1D (часто для индексов)
torch.LongTensor(2, 5)                 # 2x5

# 9. torch.BoolTensor() - булевы значения
torch.BoolTensor([True, False, True])  # 1D
torch.BoolTensor(3, 3)                 # 3x3 матрица

# 10. torch.Tensor() - псевдоним для FloatTensor
torch.Tensor([1, 2, 3])                # То же что torch.FloatTensor()
torch.Tensor(2, 4)                     # 2x4 с мусорными значениями
torch.empty(2, 4)                     # 2x4 с мусорными значениями
```

## Основные способы создания torch.tensor() - из данных

```python
import torch

# Скаляр (0D тензор)
scalar = torch.tensor(3.14)
print(scalar)  # tensor(3.1400)

# Вектор (1D тензор)
vector = torch.tensor([1, 2, 3, 4, 5])
print(vector)  # tensor([1, 2, 3, 4, 5])

# Матрица (2D тензор)
matrix = torch.tensor([[1, 2, 3], [4, 5, 6]])
print(matrix)
# tensor([[1, 2, 3],
#         [4, 5, 6]])

# 3D тензор
tensor_3d = torch.tensor([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(tensor_3d.shape)  # torch.Size([2, 2, 2])
```

## С указанием типа данных (dtype)

```python
# Разные типы данных
int_tensor = torch.tensor([1, 2, 3], dtype=torch.int32)
float_tensor = torch.tensor([1.0, 2.0, 3.0], dtype=torch.float32)
double_tensor = torch.tensor([1, 2, 3], dtype=torch.float64)
bool_tensor = torch.tensor([True, False, True], dtype=torch.bool)

print(int_tensor.dtype)    # torch.int32
print(float_tensor.dtype)  # torch.float32
print(double_tensor.dtype) # torch.float64
print(bool_tensor.dtype)   # torch.bool
```

## Специальные тензоры

Нули и единицы

```python
# Тензоры, заполненные нулями
zeros_1d = torch.zeros(5)           # [0, 0, 0, 0, 0]
zeros_2d = torch.zeros(2, 3)        # 2x3 матрица нулей
zeros_3d = torch.zeros(2, 3, 4)     # 2x3x4 тензор нулей

# Тензоры, заполненные единицами
ones_1d = torch.ones(5)             # [1, 1, 1, 1, 1]
ones_2d = torch.ones(2, 3)          # 2x3 матрица единиц

# С указанием типа данных
zeros_float64 = torch.zeros(3, dtype=torch.float64)
```

Заполнение константой

```python
# Тензор, заполненный значением
full_tensor = torch.full((2, 3), 3.14)
print(full_tensor)
# tensor([[3.1400, 3.1400, 3.1400],
#         [3.1400, 3.1400, 3.1400]])
```

Диагональные матрицы

```python
# Единичная матрица
eye_matrix = torch.eye(3)
print(eye_matrix)
# tensor([[1., 0., 0.],
#         [0., 1., 0.],
#         [0., 0., 1.]])

# Диагональ с заданными значениями
diag_tensor = torch.diag(torch.tensor([1, 2, 3]))
print(diag_tensor)
# tensor([[1, 0, 0],
#         [0, 2, 0],
#         [0, 0, 3]])
```

Последовательности (Диапазон)

```python
# Арифметическая прогрессия
arange_tensor = torch.arange(0, 10, 2)  # start, end, step
print(arange_tensor)  # tensor([0, 2, 4, 6, 8])

# Линейное пространство (разобьет от start до end на num_points равных частей)
linspace_tensor = torch.linspace(0, 1, 5)  # start, end, num_points
print(linspace_tensor)  # tensor([0.0000, 0.2500, 0.5000, 0.7500, 1.0000])

t = torch.linspace(0,10,5) #tensor([ 0.0000,  2.5000,  5.0000,  7.5000, 10.0000])
print(t)

# Логарифмическое пространство
logspace_tensor = torch.logspace(0, 3, 4)  # 10^0 to 10^3
print(logspace_tensor)  # tensor([1., 10., 100., 1000.])
```

## Случайные тензоры

```python
# Равномерное распределение
uniform = torch.rand(2, 3)  # [0, 1)
print(uniform)

# Нормальное распределение
normal = torch.randn(2, 3)  # mean=0, std=1
print(normal)

# С заданным диапазоном
randint = torch.randint(0, 10, (3, 3))  # low, high, size
print(randint)

# Рандом с seed для воспроизводимости (при каждом запуске программы, будут генерироваться одинаковые рандомные числа)
torch.manual_seed(42)
random_tensor = torch.rand(3)
print(random_tensor)  # Всегда одинаковый результат

t = torch.empty(2, 3)
t.random_(0, 10)  # заполняет t случайными целыми от 0 до 9
```

## Клонирование и копирование

```python
original = torch.tensor([1, 2, 3])

# Клонирование (новая память)
clone = original.clone()
clone[0] = 100
print(original)  # tensor([1, 2, 3])
print(clone)     # tensor([100, 2, 3])

# Копирование
copy = torch.empty_like(original)
copy.copy_(original)

# detach() - отключает от графа вычислений
x = torch.tensor([1.0], requires_grad=True)
y = x.detach()  # y не участвует в градиентах
```

## Атрибуты тензоров

```python
tensor = torch.tensor([[1, 2, 3], [4, 5, 6]])

print("Shape:", tensor.shape)          # torch.Size([2, 3])
print("Size:", tensor.size())          # torch.Size([2, 3])
print("Dim:", tensor.dim())            # 2 (ранг)
print("Num elements:", tensor.numel()) # 6
print("Dtype:", tensor.dtype)          # torch.int64
print("Device:", tensor.device)        # cpu
print("Requires grad:", tensor.requires_grad)  # False

# Тензор с градиентами
x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
print(x.requires_grad)  # True
```

## Изменение формы и типа

Изменение формы представления

```python
tensor = torch.arange(12)

# view() - изменение формы (требует непрерывности)
reshaped = tensor.view(3, 4)
print(reshaped.shape)  # torch.Size([3, 4])

# reshape() - более гибкий аналог view()
reshaped2 = tensor.reshape(2, 6)
print(reshaped2.shape)  # torch.Size([2, 6])

# Добавление/удаление размерностей
unsqueezed = tensor.unsqueeze(0)  # добавить размерность
print(unsqueezed.shape)  # torch.Size([1, 12])

squeezed = unsqueezed.squeeze()   # удалить единичные размерности
print(squeezed.shape)    # torch.Size([12])

# Транспонирование
matrix = torch.tensor([[1, 2, 3], [4, 5, 6]])
transposed = matrix.T
print(transposed.shape)  # torch.Size([3, 2])
```

Изменение типа данных

```python
tensor = torch.tensor([1, 2, 3])

# Разные способы
float_tensor = tensor.float()      # to torch.float32
double_tensor = tensor.double()    # to torch.float64
int_tensor = tensor.int()          # to torch.int32
long_tensor = tensor.long()        # to torch.int64

# Использование to()
new_tensor = tensor.to(torch.float16)
new_tensor = tensor.to(dtype=torch.float64)

# Смена устройства
if torch.cuda.is_available():
    cuda_tensor = tensor.to('cuda')
    cpu_tensor = cuda_tensor.to('cpu')
```

Конкатенация и разделение

```python
# Конкатенация
a = torch.tensor([1, 2, 3])
b = torch.tensor([4, 5, 6])
cat = torch.cat([a, b])  # tensor([1, 2, 3, 4, 5, 6])
stack = torch.stack([a, b])  # tensor([[1, 2, 3], [4, 5, 6]])

# Разделение
tensor = torch.arange(10)
chunks = torch.chunk(tensor, 3)  # 3 части
splits = torch.split(tensor, 3)  # по 3 элемента

# Добавление размерности
expanded = a.unsqueeze(1)  # [3] -> [3, 1]
```

Создание тензоров на GPU

```python
# Проверка доступности CUDA
print(torch.cuda.is_available())
print(torch.cuda.device_count())

# Создание тензора на GPU
if torch.cuda.is_available():
    # Способ 1: создание на GPU
    gpu_tensor = torch.tensor([1, 2, 3], device='cuda')

    # Способ 2: перенос на GPU
    cpu_tensor = torch.tensor([1, 2, 3])
    gpu_tensor = cpu_tensor.to('cuda')
    gpu_tensor = cpu_tensor.cuda()  # альтернатива

    # Обратно на CPU
    cpu_tensor = gpu_tensor.cpu()
```

## Представления тензоров в PyTorch

## Основные методы изменения формы

Видеоурок - https://rutube.ru/video/d3364be7f6ffdbdb5621647da0fb0465/?playlist=567721

1. view() - изменение формы с проверкой непрерывности

```python
import torch

# Базовый пример
x = torch.arange(12)  # tensor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
y = x.view(3, 4)      # Размер 3×4

# Автоматическое вычисление размерности
z = x.view(3, -1)     # -1 вычисляется автоматически
print(z.shape)        # torch.Size([3, 4])

# 3D представление
tensor_3d = x.view(2, 3, 2)
print(tensor_3d.shape)  # torch.Size([2, 3, 2])

# Ошибка при несовпадении числа элементов
# x.view(3, 5)  # RuntimeError: shape '[3, 5]' is invalid
```

2. reshape() - более гибкий аналог view()

```python
x = torch.tensor([[1, 2], [3, 4]])

# Работает как view() для непрерывных тензоров
y = x.reshape(4)      # [1, 2, 3, 4]
z = x.reshape(1, 4)   # [[1, 2, 3, 4]]

# Создает копию при необходимости
x_t = x.t()           # транспонирование
# x_t.view(4)         # Ошибка! Тензор не непрерывный
x_t_reshaped = x_t.reshape(4)  # Работает
```

resize для тензора 27 элементами

```python
import torch

# Создаем тензор с 27 элементами
x = torch.arange(27)  # [0, 1, 2, ..., 26]
print("Исходный тензор (27 элементов):")
print("Форма:", x.shape)  # torch.Size([27])
print("Данные:", x.tolist())

# 1. Изменение на 3x3x3 куб
x.resize_(3, 3, 3)
print("\n1. resize_(3, 3, 3):")
print("Форма:", x.shape)  # torch.Size([3, 3, 3])
print("Данные:", x.tolist())

# 2. Изменение на 9x3 матрицу
x.resize_(9, 3)
print("\n2. resize_(9, 3):")
print("Форма:", x.shape)  # torch.Size([9, 3])

# 3. Уменьшение размера (первые 12 элементов)
x.resize_(12)
print("\n3. resize_(12):")
print("Форма:", x.shape)  # torch.Size([12])
print("Данные:", x.tolist())  # [0, 1, 2, ..., 11]

# 4. Увеличение размера (новые элементы заполняются мусором)
x.resize_(30)
print("\n4. resize_(30):")
print("Форма:", x.shape)  # torch.Size([30])
print("Первые 15 элементов:", x[:15].tolist())
print("Последние 15 элементов:", x[15:].tolist())  # мусорные значения

# 5. 1x27 строка
x.resize_(1, 27)
print("\n5. resize_(1, 27):")
print("Форма:", x.shape)  # torch.Size([1, 27])

# 6. 27x1 столбец
x.resize_(27, 1)
print("\n6. resize_(27, 1):")
print("Форма:", x.shape)  # torch.Size([27, 1])
```

.ravel() тензор любого представления вытягивает в один вектор.

```python
import torch

# 1. Базовый пример
x = torch.tensor([[1, 2, 3], [4, 5, 6]])  # 2x3
print("Исходный тензор 2x3:")
print(x)
print("Форма:", x.shape)  # torch.Size([2, 3])

y = x.ravel()  # или x.ravel()
print("\nПосле ravel():")
print(y)  # tensor([1, 2, 3, 4, 5, 6])
print("Форма:", y.shape)  # torch.Size([6])
```

.permute Меняем строки и столбцы местами (Транспонирование)

```python
import torch

# Создаем тензор 3x9
x = torch.arange(27).reshape(3, 9)  # 3 строки, 9 столбцов
print("Исходный тензор 3x9:")
print(x)
print("Форма:", x.shape)  # torch.Size([3, 9])

"""
Визуально:
x = [[ 0,  1,  2,  3,  4,  5,  6,  7,  8],   # строка 0
     [ 9, 10, 11, 12, 13, 14, 15, 16, 17],   # строка 1
     [18, 19, 20, 21, 22, 23, 24, 25, 26]]   # строка 2
     ↑    ↑    ↑    ↑    ↑    ↑    ↑    ↑    ↑
   кол0 кол1 кол2 кол3 кол4 кол5 кол6 кол7 кол8
"""

# 1. Транспонирование (3x9 -> 9x3)
y = x.permute(1, 0)  # меняем местами оси: (строки, столбцы) -> (столбцы, строки)
print("\n1. permute(1, 0) - транспонирование:")
print(y)
print("Форма:", y.shape)  # torch.Size([9, 3])

"""
y = [[ 0,  9, 18],   # бывший столбец 0 стал строкой 0
     [ 1, 10, 19],   # бывший столбец 1 стал строкой 1
     [ 2, 11, 20],   # бывший столбец 2 стал строкой 2
     [ 3, 12, 21],   # бывший столбец 3 стал строкой 3
     [ 4, 13, 22],   # бывший столбец 4 стал строкой 4
     [ 5, 14, 23],   # бывший столбец 5 стал строкой 5
     [ 6, 15, 24],   # бывший столбец 6 стал строкой 6
     [ 7, 16, 25],   # бывший столбец 7 стал строкой 7
     [ 8, 17, 26]]   # бывший столбец 8 стал строкой 8
"""
```

Добавление и удаление осей тензера.

```python
import torch

# UNSQUEEZE - ДОБАВЛЯЕТ ось размерности 1
x = torch.tensor([1, 2, 3])  # shape [3]

# Добавляем ось в начало -> [[1, 2, 3]]
x_2d_row = x.unsqueeze(0)    # shape [1, 3]

# Добавляем ось в конец -> [[1], [2], [3]]
x_2d_col = x.unsqueeze(1)    # shape [3, 1]

# Добавляем в середину для 3D
x_3d = x.unsqueeze(0).unsqueeze(2)  # shape [1, 3, 1]

# SQUEEZE - УДАЛЯЕТ оси размерности 1
y = torch.tensor([[[1, 2, 3]]])  # shape [1, 1, 3]

# Удаляем ВСЕ оси размерности 1
y_simple = y.squeeze()  # shape [3]

# Удаляем КОНКРЕТНУЮ ось размерности 1
y_specific = y.squeeze(dim=0)  # shape [1, 3]

# Удаляем только ось 0 если она равна 1
y_target = y.squeeze(0)  # shape [1, 3]
```
