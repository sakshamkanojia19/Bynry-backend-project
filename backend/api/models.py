from django.conf import settings
from django.db import models

class ServiceRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved')
    ]
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    request_type = models.CharField(max_length=100)
    details = models.TextField()
    attachment = models.FileField(upload_to="attachments/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.customer.username} - {self.request_type}"
