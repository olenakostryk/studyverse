from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from knowledge_graph.models import TopicNode

    
class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        course = serializer.save(user=self.request.user)

        TopicNode.objects.create(
            course=course,
            title=course.title,
            summary=course.summary
    )