from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import ServiceRequest
from .serializers import ServiceRequestSerializer

class ServiceRequestViewSet(viewsets.ModelViewSet):
    queryset = ServiceRequest.objects.all().order_by('-created_at')
    serializer_class = ServiceRequestSerializer

    def create(self, request, *args, **kwargs):
        print("Incoming request data:", request.data)  
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
