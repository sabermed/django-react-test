from rest_framework import serializers
from .models import Societe, Compteur, TotalEnergie, Dynef, HistoriqueCalcul


class SocieteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Societe
        fields = '__all__'
        read_only_fields = ('user',)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {
            'id': data['id'],
            'siret': data['siret'],
            'raisonSocial': data['raisonSocial']
        }


class CompteurSerializer(serializers.ModelSerializer):
    siret = serializers.CharField(write_only=True)

    class Meta:
        model = Compteur
        fields = '__all__'
        read_only_fields = ('societe',)

    def create(self, validated_data):
        siret = validated_data.pop('siret')
        try:
            societe = Societe.objects.get(siret=siret)
            if societe.user != self.context['request'].user:
                raise serializers.ValidationError(
                    {"message": "Vous n'êtes pas autorisé à ajouter un compteur à cette société"})
        except Societe.DoesNotExist:
            raise serializers.ValidationError(
                {"message": "La societe n'existe pas"})
        compteur = Compteur.objects.create(societe=societe, **validated_data)
        return compteur

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Remove the "societe" field from the serialized data
        return {
            'id': data['id'],
            'numCompteur': data['numCompteur'],
            'typeEnergie': data['typeEnergie'],
            'consommation': data['consommation']
        }


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


class ContractPriceSerializer(serializers.Serializer):
    siret = serializers.CharField(max_length=255)
    numCompteur = serializers.CharField(max_length=255)
    dateDebut = serializers.DateField()
    dateFin = serializers.DateField()


class HistoriqueCalculSerializer(serializers.ModelSerializer):
    typeEnergie = serializers.SerializerMethodField()
    numCompteur = serializers.SerializerMethodField()
    consommation = serializers.SerializerMethodField()
    societe_siret = serializers.ReadOnlyField(source='societe.siret')
    societe_raison = serializers.ReadOnlyField(source='societe.raisonSocial')

    class Meta:
        model = HistoriqueCalcul
        fields = ('id', 'resultat', 'typeEnergie', 'numCompteur', 'consommation',
                  'societe_siret', 'societe_raison')

    def get_typeEnergie(self, obj):
        if obj.dynef is not None:
            return 'GAZ'
        elif obj.totalEnergie is not None:
            return 'ELEC'
        else:
            return ''

    def get_numCompteur(self, obj):
        societe = obj.societe
        compteur = Compteur.objects.filter(societe=societe).first()
        if compteur:
            return compteur.numCompteur
        else:
            return ''

    def get_consommation(self, obj):
        societe = obj.societe
        compteur = Compteur.objects.filter(societe=societe).first()
        if compteur:
            return compteur.consommation
        else:
            return ''
