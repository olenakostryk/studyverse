from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TopicNode, TopicRelation
from .serializers import TopicNodeSerializer, TopicRelationSerializer


class TopicNodeListCreateView(generics.ListCreateAPIView):
    queryset = TopicNode.objects.all()
    serializer_class = TopicNodeSerializer


class TopicNodeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TopicNode.objects.all()
    serializer_class = TopicNodeSerializer


class GraphDataView(APIView):
    def get(self, request, course_id):
        nodes = TopicNode.objects.filter(course_id=course_id)
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
            "course_id": course_id,
            "nodes": node_data,
            "edges": edge_data,
        })