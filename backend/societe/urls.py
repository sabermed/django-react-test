from django.urls import path
from .views import AddSocieteView, AddCompteurToSocieteView


urlpatterns = [
    path('ajouterSociete', AddSocieteView.as_view(), name="Add Societe"),
    path('ajouterCompteur', AddCompteurToSocieteView.as_view(),
         name="Add Compteur To Societe")
]
