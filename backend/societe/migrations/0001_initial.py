# Generated by Django 4.2 on 2023-04-15 16:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Dynef',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prix', models.FloatField()),
                ('dateDebut', models.DateField()),
                ('dateFin', models.DateField()),
            ],
            options={
                'db_table': 'Dynef',
            },
        ),
        migrations.CreateModel(
            name='TotalEnergie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prix', models.FloatField()),
                ('dateDebut', models.DateField()),
                ('dateFin', models.DateField()),
            ],
            options={
                'db_table': 'TotalEnergie',
            },
        ),
        migrations.CreateModel(
            name='Societe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('siret', models.CharField(max_length=14, unique=True)),
                ('raisonSocial', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Societe',
            },
        ),
        migrations.CreateModel(
            name='HistoriqueCalcul',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resultat', models.FloatField()),
                ('dateToday', models.DateField(auto_now_add=True)),
                ('dynef', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='societe.dynef')),
                ('societe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='societe.societe')),
                ('totalEnergie', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='societe.totalenergie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'HistoriqueCalcul',
            },
        ),
        migrations.CreateModel(
            name='Compteur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numCompteur', models.CharField(max_length=255, unique=True)),
                ('typeEnergie', models.CharField(max_length=255)),
                ('consommation', models.FloatField()),
                ('societe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='societe.societe')),
            ],
            options={
                'db_table': 'Compteur',
            },
        ),
    ]
