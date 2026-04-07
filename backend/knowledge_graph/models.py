from django.db import models
from courses.models import Course


class TopicNode(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='topic_nodes'
    )
    title = models.CharField(max_length=255)
    summary = models.TextField(blank=True, null=True)
    difficulty_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']

    def __str__(self) -> str:
        return self.title


class TopicRelation(models.Model):
    from_topic = models.ForeignKey(
        TopicNode,
        on_delete=models.CASCADE,
        related_name='outgoing_relations'
    )
    to_topic = models.ForeignKey(
        TopicNode,
        on_delete=models.CASCADE,
        related_name='incoming_relations'
    )
    strength = models.FloatField(default=1.0)

    class Meta:
        unique_together = ('from_topic', 'to_topic')

    def __str__(self) -> str:
        return f"{self.from_topic} -> {self.to_topic}"