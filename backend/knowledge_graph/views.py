from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import TopicNode, TopicRelation
from .serializers import TopicNodeSerializer, TopicRelationSerializer
from courses.models import Course


class TopicNodeListCreateView(generics.ListCreateAPIView):
    queryset = TopicNode.objects.all()
    serializer_class = TopicNodeSerializer


class TopicNodeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TopicNode.objects.all()
    serializer_class = TopicNodeSerializer
    
class TopicRelationListCreateView(generics.ListCreateAPIView):
    queryset = TopicRelation.objects.all()
    serializer_class = TopicRelationSerializer

class GraphDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id=None):

        # LEVEL 1: Return Courses as Planets
        if course_id is None:
            courses = Course.objects.filter(user=request.user)

            course_nodes = [
                {
                    "id": course.id,
                    "title": course.title,
                    "type": "course"
                }
                for course in courses
            ]

            return Response({
                "mode": "courses",
                "nodes": course_nodes,
                "edges": []
            })

        # LEVEL 2: Return Topics inside selected course
        nodes = TopicNode.objects.filter(
            course_id=course_id,
            course__user=request.user
        )

        relations = TopicRelation.objects.filter(
            from_topic__course_id=course_id,
            to_topic__course_id=course_id
        )

        node_data = [
            {
                "id": node.id,
                "title": node.title,
                "summary": node.summary,
                "difficulty_score": node.difficulty_score,
                "type": "topic"
            }
            for node in nodes
        ]

        edge_data = [
            {
                "id": rel.id,
                "source": rel.from_topic_id,
                "target": rel.to_topic_id,
                "strength": rel.strength,
            }
            for rel in relations
        ]

        return Response({
            "mode": "topics",
            "nodes": node_data,
            "edges": edge_data
        })