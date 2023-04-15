from rest_framework import serializers
from .models import Societe, Compteur, TotalEnergie, Dynef, HistoriqueCalcul


class SocieteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Societe
        fields = '__all__'
        read_only_fields = ('user',)


class CompteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compteur
        fields = '__all__'


class TotalEnergieSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalEnergie
        fields = '__all__'


class DynefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dynef
        fields = '__all__'


class HistoriqueCalculSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoriqueCalcul
        fields = '__all__'
