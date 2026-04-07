from django.db import models
from django.contrib.auth.models import User
from knowledge_graph.models import TopicNode
from courses.models import Course


class Progress(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='topic_progress'
    )
    topic = models.ForeignKey(
        TopicNode,
        on_delete=models.CASCADE,
        related_name='progress_records'
    )
    mastery_level = models.FloatField(default=0.0)
    last_studied = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'topic')

    def __str__(self) -> str:
        return f"{self.user.username} - {self.topic.title} ({self.mastery_level})"


class StudySession(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='study_sessions'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='study_sessions'
    )
    duration_minutes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"{self.user.username} - {self.course.title} - {self.duration_minutes} min"