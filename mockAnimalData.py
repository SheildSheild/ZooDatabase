import random
from datetime import datetime, timedelta

# Function to generate a random date
def str_time_prop(start, end, format, prop):
    """Get a time at a proportion of a range of two formatted times."""
    stime = datetime.strptime(start, format)
    etime = datetime.strptime(end, format)
    ptime = stime + prop * (etime - stime)
    return ptime.date()

def random_date(start, end, prop):
    return str_time_prop(start, end, '%Y-%m-%d', prop)

# List of sample names and species for animals
names = ['Leo', 'Ella', 'Zara', 'Milo', 'Juno', 'Kiki', 'Max', 'Luna', 'Oreo', 'Bella', 'Charlie', 'Daisy', 'Angy', 'Talha', 'Seb']
species = ['Lion', 'Elephant', 'Zebra', 'Giraffe', 'Tiger', 'Bear', 'Rhino', 'Hippo', 'Penguin', 'Flamingo']

# Generate 100 mock data entries for the ANIMALS table
for i in range(100):
    habitat_id = random.randint(4, 11)  # Assuming there are 5 habitats
    name = random.choice(names)
    weight = round(random.uniform(50, 300), 2)  # Weights between 50 and 300 kg
    height = round(random.uniform(1, 5), 2)  # Heights between 1 and 5 meters
    birth_date = random_date("2010-01-01", "2022-12-31", random.random())
    species_name = random.choice(species)

    print(f"INSERT INTO ANIMALS (Habitat_ID, Name, Weight, Height, Birth_Date, Species) VALUES ({habitat_id}, '{name}', {weight}, {height}, '{birth_date}', '{species_name}');")
