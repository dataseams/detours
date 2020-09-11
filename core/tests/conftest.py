"""pytest auto-discovered shareable test fixtures."""
import pytest
from _pytest.monkeypatch import MonkeyPatch


@pytest.fixture(autouse=True)
def no_requests(monkeypatch):
    """Remove requests.sessions.Session.request for all tests."""
    monkeypatch.delattr("requests.sessions.Session.request")


@pytest.fixture(scope="class")
def class_monkeypatch(request):
    request.cls.monkeypatch = MonkeyPatch()
