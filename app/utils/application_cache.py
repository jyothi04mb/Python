from typing import Any, Optional, Dict
from datetime import datetime, timedelta
import threading
import logging

logger = logging.getLogger(__name__)

class ApplicationCache:
    def __init__(self, max
