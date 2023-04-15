from django.urls import path
from .views import AddSocieteView, AddCompteurToSocieteView, GetSocieteByUserView, GetSocieteBySiretView, GetListCompteurBySocieteView, GetCompteurBySocieteView, ContractPriceView


urlpatterns = [
    path('ajouterSociete', AddSocieteView.as_view(), name="Add Societe"),
    path('getSocieteByCompte', GetSocieteByUserView.as_view(),
         name="get Societe By Compte"),
    path('getSocieteBySiret/<str:siret>',
         GetSocieteBySiretView.as_view(), name="get Societe By Siret"),
    path('ajouterCompteurToSociete', AddCompteurToSocieteView.as_view(),
         name="Add Compteur To Societe"),
    path('getListCompteurBySociete/<str:siret>',
         GetListCompteurBySocieteView.as_view(), name="get Compteurs By User And Siret"),
    path('getCompteurBySociete/<str:siret>/<str:numCompteur>',
         GetCompteurBySocieteView.as_view(), name="get Compteur By Societe"),
    path('effectuerUnCalcule',
         ContractPriceView.as_view(), name="Price Calculation"),
]
