import json
import os
import sys
import traceback

# Ensure the backend root is on the Python path
backend_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_root not in sys.path:
    sys.path.insert(0, backend_root)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

try:
    from django.core.wsgi import get_wsgi_application
    app = application = get_wsgi_application()
except Exception:
    error_msg = traceback.format_exc()

    def app(environ, start_response):
        body = json.dumps({
            "error": "Django failed to start",
            "traceback": error_msg,
        }).encode("utf-8")
        start_response("500 Internal Server Error", [
            ("Content-Type", "application/json"),
            ("Content-Length", str(len(body))),
        ])
        return [body]
