from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TopicNode
from decouple import config



class TopicSummaryAI(APIView):
    def get(self, request, topic_id):
        try:
            topic = TopicNode.objects.get(id=topic_id)

            # 🔥 MOCK SUMMARY
            summary = f"""
            • {topic.title} is an important concept in this subject  
            • It helps understand key ideas step by step  
            • It is commonly used in real-world problems  
            • Learning this will improve your understanding  
            """

            return Response({"summary": summary})

        except TopicNode.DoesNotExist:
            return Response({"error": "Topic not found"}, status=404)
        
class TopicFlashcardsAI(APIView):
    def get(self, request, topic_id):
        try:
            topic = TopicNode.objects.get(id=topic_id)

            # 🔥 MOCK DATA
            flashcards = [
                {
                    "question": f"What is {topic.title}?",
                    "answer": f"{topic.title} is an important concept in this topic."
                },
                {
                    "question": f"Why is {topic.title} useful?",
                    "answer": "It helps understand the subject better."
                },
                {
                    "question": f"Give example of {topic.title}",
                    "answer": "Example explanation here."
                }
            ]

            return Response({"flashcards": flashcards})

        except TopicNode.DoesNotExist:
            return Response({"error": "Not found"}, status=404)
        
class TopicQuizAI(APIView):
    def get(self, request, topic_id):
        try:
            topic = TopicNode.objects.get(id=topic_id)

            quiz = [
                {
                    "question": f"What is {topic.title}?",
                    "options": [
                        "A basic concept",
                        "A random term",
                        "Not important",
                        "A number"
                    ],
                    "correct": 0
                },
                {
                    "question": f"Why is {topic.title} useful?",
                    "options": [
                        "To confuse students",
                        "To understand the subject",
                        "To memorize only",
                        "No reason"
                    ],
                    "correct": 1
                }
            ]

            return Response({"quiz": quiz})

        except TopicNode.DoesNotExist:
            return Response({"error": "Not found"}, status=404)