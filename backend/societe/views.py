from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Societe, Compteur, TotalEnergie, Dynef, HistoriqueCalcul
from .serializers import SocieteSerializer, CompteurSerializer, ContractPriceSerializer


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
            return Response({'message': 'Societe ajouter'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetSocieteByUserView(generics.ListAPIView):
    serializer_class = SocieteSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Societe.objects.filter(user=user.id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetSocieteBySiretView(generics.RetrieveAPIView):
    serializer_class = SocieteSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'siret'

    def get_queryset(self):
        user = self.request.user
        return Societe.objects.filter(user=user.id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddCompteurToSocieteView(generics.CreateAPIView):
    queryset = Compteur.objects.all()
    serializer_class = CompteurSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if Compteur.objects.filter(numCompteur=serializer.validated_data['numCompteur']).exists():
                return Response({'error': 'Compteur déjà existe'}, status=status.HTTP_400_BAD_REQUEST)

            compteur = serializer.save()
            serializer = self.serializer_class(compteur)
            return Response({"message": "Compteur ajouter"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetListCompteurBySocieteView(generics.ListAPIView):
    serializer_class = CompteurSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        siret = self.kwargs.get('siret')
        try:
            societe = Societe.objects.get(user=user, siret=siret)
            return Compteur.objects.filter(societe=societe)
        except Societe.DoesNotExist:
            return Compteur.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetCompteurBySocieteView(generics.RetrieveAPIView):
    serializer_class = CompteurSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Compteur.objects.filter(societe__user=user.id)

    def get_object(self):
        queryset = self.get_queryset()
        numCompteur = self.kwargs.get('numCompteur')
        siret = self.kwargs.get('siret')
        try:
            compteur = queryset.get(
                numCompteur=numCompteur, societe__siret=siret)
        except Compteur.DoesNotExist:
            raise Http404({"message": "Le compteur n'existe pas"})
        return compteur


class ContractPriceView(generics.CreateAPIView):
    serializer_class = ContractPriceSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        dateDebut = serializer.validated_data['dateDebut']
        dateFin = serializer.validated_data['dateFin']
        siret = serializer.validated_data['siret']
        numCompteur = serializer.validated_data['numCompteur']

        try:
            societe = Societe.objects.get(siret=siret, user=request.user.id)
        except Societe.DoesNotExist:
            return Response({"message": "La societe n'existe pas"})

        try:
            compteur = Compteur.objects.get(
                numCompteur=numCompteur, societe=societe)
        except Compteur.DoesNotExist:
            return Response({"message": "num Compteur n'existe pas"})

        if compteur.typeEnergie == 'ELEC':
            offer = TotalEnergie.objects.filter(
                dateDebut__lte=dateDebut, dateFin__gte=dateFin).first()
        else:
            offer = Dynef.objects.filter(
                dateDebut__lte=dateDebut, dateFin__gte=dateFin).first()

        if offer is None:
            return Response({"message": "il n'as pas aucune offre dans cette période choisi.", "resultat": 0}, status=status.HTTP_200_OK)

        contract_price = compteur.consommation * offer.prix
        return Response({"message": "calcul effectuer.", "resultat": contract_price}, status=status.HTTP_200_OK)
