from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import SocieteSerializer, CompteurSerializer
from .models import Societe, Compteur, TotalEnergie, Dynef, HistoriqueCalcul
from rest_framework.permissions import AllowAny, IsAuthenticated


class AddSocieteView(generics.CreateAPIView):
    queryset = Societe.objects.all()
    serializer_class = SocieteSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if Societe.objects.filter(siret=serializer.validated_data['siret']).exists():
                return Response({'error': 'Societe déjà existe'}, status=status.HTTP_400_BAD_REQUEST)
            societe = serializer.save(user_id=request.user.id)
            serializer = self.serializer_class(societe)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddCompteurToSocieteView(generics.CreateAPIView):
    queryset = Compteur.objects.all()
    serializer_class = CompteurSerializer

    def post(self, request, *args, **kwargs):
        try:
            societe = Societe.objects.get(siret=request.data.get('siret'))
        except Societe.DoesNotExist:
            return Response({'error': "La societe n'existe pas"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            compteur = serializer.save(societe=societe)
            serializer = self.serializer_class(compteur)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
