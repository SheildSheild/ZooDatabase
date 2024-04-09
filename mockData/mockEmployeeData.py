import random
import string

def generate_ssn():
    """Generate a random SSN-like string."""
    return '{}-{}-{}'.format(
        ''.join(random.choices(string.digits, k=3)),
        ''.join(random.choices(string.digits, k=2)),
        ''.join(random.choices(string.digits, k=4))
    )

def generate_email(first_name, last_name):
    """Generate a simple email address."""
    domains = ['example.com', 'mail.com', 'test.org']
    return '{}.{}@{}'.format(first_name.lower(), last_name.lower(), random.choice(domains))

first_names = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'Chris', 'Laura', 'Rosemary', 'Fabian', 'Noah', 'Tommy', 'Donesh', 'Will']
last_names = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Richter', 'Lee', 'Gomez', 'Ngyuen', 'Barrientos', 'Castellano']
genders = ['Male', 'Female', 'Other']
addresses = ['123 Main St', '456 Oak Ave', '789 Pine Rd', '101 Maple Dr', '486 Sheppard Dr', '3321 Briar Forest Dr', '984 Evandale Ln', '531 Market St']
birth_dates = ['1980-01-01', '1990-02-02', '1975-03-15', '1985-07-07', '1999-05-09', '2002-11-09']
start_dates = ['2023-01-01', '2023-06-15', '2024-01-10', '2024-03-20']

# Generate 10 employee insert commands
for _ in range(10):
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    ssn = generate_ssn()
    gender = random.choice(genders)
    email = generate_email(first_name, last_name)
    address = random.choice(addresses)
    birth_date = random.choice(birth_dates)
    start_date = random.choice(start_dates)
    user_id = random.randint(1, 10)
    isManager = random.randint(0, 1)
    isMedic = random.randint(0, 1)

    print(f"INSERT INTO EMPLOYEES (Supervisor_ID, Shop_ID, Habitat_ID, Restaurant_ID, Fname, Lname, SSN, Gender, Email, Address, Birth_Date, Start_Date, user_id, isManager, isMedic) VALUES (NULL, NULL, NULL, NULL, '{first_name}', '{last_name}', '{ssn}', '{gender}', '{email}', '{address}', '{birth_date}', '{start_date}', {user_id}, {isManager}, {isMedic});")
