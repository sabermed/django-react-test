from datetime import datetime
from django.core.management.base import BaseCommand
from societe.models import TotalEnergie, Dynef
import xml.etree.ElementTree as ET
import csv
from decimal import Decimal
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Imports data from XML and CSV files'

    def add_arguments(self, parser):
        parser.add_argument('xml_file', type=str)
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        xml_file = options['xml_file']
        csv_file = options['csv_file']

        # Import data from XML file
        tree = ET.parse(xml_file)
        root = tree.getroot()
        for child in root:
            date_debut = datetime.strptime(child.find(
                'dateDebut').text, '%d/%m/%Y').strftime('%Y-%m-%d')
            date_fin = datetime.strptime(child.find(
                'dateFin').text, '%d/%m/%Y').strftime('%Y-%m-%d')
            prix_str = child.find('prix').text
            prix = Decimal(prix_str.replace(',', '.'))
            TotalEnergie.objects.create(
                dateDebut=date_debut, dateFin=date_fin, prix=prix)

        print('Total Data imported successfully')

        # Import data from CSV file
        with open(csv_file, 'r') as f:
            reader = csv.reader(f)
            header = next(reader)  # extract header row
            logger.debug(f'Header: {header}')
            date_debut_idx = None
            date_fin_idx = None
            prix_idx = None
            for i, col_name in enumerate(header):
                if col_name == 'Date Debut':
                    date_debut_idx = i
                elif col_name == 'Date Fin':
                    date_fin_idx = i
                elif col_name == 'prix':
                    prix_idx = i
            if date_debut_idx is None or date_fin_idx is None or prix_idx is None:
                logger.warning('Invalid header format')
            else:
                for row in reader:
                    logger.debug(f'Row: {row}')
                    try:
                        date_debut = row[date_debut_idx]
                        date_fin = row[date_fin_idx]
                        prix_str = row[prix_idx]
                        date_debut = datetime.strptime(
                            date_debut, '%d/%m/%Y').strftime('%Y-%m-%d')
                        date_fin = datetime.strptime(
                            date_fin, '%d/%m/%Y').strftime('%Y-%m-%d')
                        prix = Decimal(prix_str.replace(',', '.'))
                        Dynef.objects.create(
                            dateDebut=date_debut, dateFin=date_fin, prix=prix)
                    except (ValueError, IndexError) as e:
                        logger.warning(f'Could not process row {row}: {e}')

        print('Dynef Data imported successfully')
