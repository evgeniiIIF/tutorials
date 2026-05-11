# Triton Inference Server

## Конвертация в ONNX

«Конвертируйте только после бенчмарка — иначе рискуете потратить время без выгоды»
Бенчмарк (benchmark) — это замер производительности модели в реальных условиях.

Не конвертируйте «на всякий случай». Сначала замерьте производительность текущей модели и сравните с ONNX‑версией. Если есть значимый выигрыш — конвертируйте. Если нет — оставьте как есть, чтобы не тратить время зря.

## Базовая структура репозитория моделей

model_repository/
├── image-classifier-resnet50/
│ ├── config.pbtxt
│ └── 1/
│ └── model.onnx
├── text-sentiment-bert-base/
│ ├── config.pbtxt
│ └── 1/
│ └── model.pt
├── object-detector-yolov8/
│ ├── config.pbtxt
│ └── 1/
│ └── model.onnx
└── speech-to-text-wav2vec2/
├── config.pbtxt
└── 1/
└── model.pt

# Описание компонентов с реальными именами

model_repository/ — корневая папка репозитория. Путь к ней передаётся Triton при запуске через --model-repository.

Папки моделей — с конкретными и понятными именами, отражающими задачу и архитектуру:

image-classifier-resnet50/ — классификатор изображений на базе ResNet‑50;

text-sentiment-bert-base/ — анализ тональности текста на BERT‑base;

object-detector-yolov8/ — детектор объектов на YOLOv8;

speech-to-text-wav2vec2/ — распознавание речи на wav2vec 2.0.

config.pbtxt — конфигурационный файл для каждой модели. Обязателен. Описывает входы/выходы, бэкенд, настройки батчинга и т. д.

Папки версий (1/) — содержат файлы моделей. Имя папки — натуральное число (версия). Triton загружает самую высокую версию по умолчанию.

Файлы моделей — с типовыми именами:

model.onnx — для моделей в формате ONNX (например, ResNet50, YOLOv8);

model.pt — для TorchScript‑моделей PyTorch (например, BERT, wav2vec2).

Примеры содержимого config.pbtxt
Для ResNet50 (ONNX):

```pbtxt
protobuf
name: "image-classifier-resnet50"
platform: "onnxruntime_onnx"
max_batch_size: 8
input [
  {
    name: "input"
    data_type: TYPE_FP32
    dims: [ 3, 224, 224 ]
  }
]
output [
  {
    name: "output"
    data_type: TYPE_FP32
    dims: [ 1000 ]
  }
]
```
