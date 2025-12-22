# PyTorch полный курс

### Аксон и дендрит – это отростки нейрона

Дендриты: дендриты принимают сигналы и несут их к телу нейрона.(много отростков)
Аксон: передает сигналы от тела клетки. (обычно один)

## Тензоры

Основные способы создания
torch.tensor() - из данных

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

С указанием типа данных (dtype)

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
