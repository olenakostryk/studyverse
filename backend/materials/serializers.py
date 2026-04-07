from rest_framework import serializers
from .models import Material


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'course', 'title', 'file', 'extracted_text', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']