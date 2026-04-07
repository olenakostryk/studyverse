from rest_framework import serializers
from .models import TopicNode, TopicRelation


class TopicNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicNode
        fields = ['id', 'course', 'title', 'summary', 'difficulty_score', 'created_at']
        read_only_fields = ['id', 'created_at']


class TopicRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicRelation
        fields = ['id', 'from_topic', 'to_topic', 'strength']
        read_only_fields = ['id']