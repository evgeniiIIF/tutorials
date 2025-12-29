# Модели для работы с текстом.

## Для анализа тональность текста (позитивный, негативный, нейтральный )

#### Классификация настроений в коротких текстах

Используем pipeline для быстрого (коробочного) подключения :

```python
!pip install transformers sentencepiece sacremoses
from transformers import pipeline
```

1. Модель для определения настроения высказывания. (Позитивное, Негативное, Нейтральное). Для англ. языка.

Ссылка - https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english

Проверил работает!


```python
classifier = pipeline("sentiment-analysis", model='distilbert/distilbert-base-uncased-finetuned-sst-2-english')

results = classifier("I like my work.")
print(results)
# [{'label': 'POSITIVE', 'score': 0.9974257349967957}]
```

2. Модель для определения настроения высказывания. (Позитивное, Негативное, Нейтральное). Для рус. языка.

Ссылка - https://huggingface.co/blanchefort/rubert-base-cased-sentiment

Проверил работает!

```python
classifier = pipeline("sentiment-analysis", model="blanchefort/rubert-base-cased-sentiment")
results = classifier("Я ненавижу обработку естественного языка")
print(results)
# [{'label': 'NEGATIVE', 'score': 0.7515643239021301}]
```

## Для перевода текста

1. Модель для перевода с Рус. на Анг. язык.

Ссылка - https://huggingface.co/Helsinki-NLP/opus-mt-ru-en

Проверил работает!

Подключение и использование

```python
translator = pipeline("translation_ru_to_en", model="Helsinki-NLP/opus-mt-ru-en")
results = translator("Привет")
print(results)
# [{'translation_text': 'Hey.'}]
```

# Модели для работы с изображениями.

## Работа с рукописными подписями на документах

1. Классификация рукописных подписей, код курсовой работы студента иранского университета в Google Colab

Ссылка - https://colab.research.google.com/github/parsa-abbasi/IUST-Pattern-Recognition/blob/main/3)%20Offline%20Signature%20Verification%20using%20Deep%20Learning/3)%20Offline%20Signature%20Verification%20using%20Deep%20Learning.ipynb#scrollTo=aqOIf43j3XBJ

Непонял как использовать.

2. Модель для обнаружения подписей в документах.

Находит подпись на документе и выделяет в рамку!
Закрытая модель, требуется запросить доступ!
Хорошо задокументирована!

Проверил работает!

Ссылка - https://huggingface.co/tech4humans/yolov8s-signature-detector
Демо - https://colab.research.google.com/drive/1X7tvqpRTRwxv5RN1FKehFFBlmKE9w0MM


3. Модель обнаружения и классификации подписи на документах.

Есть файлы реализации 
Непонял как использовать!

Ссылка - https://huggingface.co/Mels22/Signature-Detection-Verification