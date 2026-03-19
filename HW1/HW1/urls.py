from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Course.urls')), # 將根目錄交由 Course.urls 處理
]