from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myhello/', include('myhello.urls')), # 把 /myhello/ 交給 myhello 處理
]