from django.contrib import admin
from .models import TopicNode, TopicRelation

admin.site.register(TopicNode)
admin.site.register(TopicRelation)