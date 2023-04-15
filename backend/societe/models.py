from django.conf import settings
from django.db import models


class Societe(models.Model):
    siret = models.CharField(max_length=14, unique=True)
    raisonSocial = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    class Meta:
        db_table = "Societe"


class Compteur(models.Model):
    numCompteur = models.CharField(max_length=255, unique=True)
    typeEnergie = models.CharField(max_length=255)
    consommation = models.FloatField()
    societe = models.ForeignKey('Societe', on_delete=models.CASCADE)

    class Meta:
        db_table = "Compteur"


class HistoriqueCalcul(models.Model):
    resultat = models.FloatField()
    dateToday = models.DateField(auto_now_add=True)
    totalEnergie = models.ForeignKey(
        'TotalEnergie', null=True, blank=True, on_delete=models.SET_NULL)
    dynef = models.ForeignKey(
        'Dynef', null=True, blank=True, on_delete=models.SET_NULL)
    societe = models.ForeignKey('Societe', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    class Meta:
        db_table = "HistoriqueCalcul"


class TotalEnergie(models.Model):
    prix = models.FloatField()
    dateDebut = models.DateField()
    dateFin = models.DateField()

    class Meta:
        db_table = "TotalEnergie"


class Dynef(models.Model):
    prix = models.FloatField()
    dateDebut = models.DateField()
    dateFin = models.DateField()

    class Meta:
        db_table = "Dynef"
