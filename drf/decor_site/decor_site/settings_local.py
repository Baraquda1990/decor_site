from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

ALLOWED_HOSTS = ['85.29.147.68', 'localhost', '127.0.0.1']

# Настройки статических файлов
STATIC_ROOT = BASE_DIR / 'static'
MEDIA_ROOT = BASE_DIR / 'media'

# Режим разработки (показывает ошибки)
DEBUG = True
