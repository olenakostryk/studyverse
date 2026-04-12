from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet


class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
class CourseViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
     return Course.objects.filter(user=self.request.user)