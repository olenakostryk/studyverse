from django.db import models
from knowledge_graph.models import TopicNode


class Flashcard(models.Model):
    topic = models.ForeignKey(
        TopicNode,
        on_delete=models.CASCADE,
        related_name='flashcards'
    )
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"Flashcard #{self.pk} - {self.topic.title}"