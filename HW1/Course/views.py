from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Course_table
import json

# 回傳課程列表 API
def courselist(request):
    if request.method == 'GET':
        courses = list(Course_table.objects.values('Department', 'CourseTitle', 'Instructor'))
        return JsonResponse({'courses': courses}, safe=False, json_dumps_params={'ensure_ascii': False})

# 加入課程 API
@csrf_exempt
def addcourse(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            department = data.get('Department')
            course_title = data.get('CourseTitle')
            instructor = data.get('Instructor')

            if department and course_title and instructor:
                Course_table.objects.create(
                    Department=department,
                    CourseTitle=course_title,
                    Instructor=instructor
                )
                return JsonResponse({'status': 'success', 'message': '課程新增成功'}, json_dumps_params={'ensure_ascii': False})
            else:
                return JsonResponse({'status': 'error', 'message': '資料不完整'}, status=400, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': '請使用 POST 請求'}, status=405)