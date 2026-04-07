from django.urls import path
from .views import TopicNodeListCreateView, TopicNodeDetailView, GraphDataView
from .ai_views import TopicSummaryAI, TopicFlashcardsAI, TopicQuizAI

urlpatterns = [
    path('topics/', TopicNodeListCreateView.as_view(), name='topic-list-create'),
    path('topics/<int:pk>/', TopicNodeDetailView.as_view(), name='topic-detail'),
    path('graph/<int:course_id>/', GraphDataView.as_view(), name='graph-data'),
    path('ai/summary/<int:topic_id>/', TopicSummaryAI.as_view()),
    path('ai/flashcards/<int:topic_id>/', TopicFlashcardsAI.as_view()),
    path("ai/quiz/<int:topic_id>/", TopicQuizAI.as_view()),
]