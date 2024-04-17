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

def generateItemIds():
    start_id = 2331
    num_items = 250

    item_ids = [start_id + i for i in range(num_items)]

    print(item_ids)

def random_price(min_price, max_price):
    return round(random.uniform(min_price, max_price), 2)

# Define possible values for Item_ID, Shop_ID, and Customer_ID
item_names = [
    "Jungle Jellies",
    "Safari Scarves",
    "Elephant Earmuffs",
    "Tiger Tail Keychains",
    "Rhino Resin Figures",
    "Leopard Print Mugs",
    "Zebra Stripe Socks",
    "Parrot Paradise T-shirts",
    "Giraffe Growth Charts",
    "Bear Balm Lip Care",
    "Flamingo Floaties",
    "Orangutan Ornaments",
    "Lion's Mane Hair Accessories",
    "Peacock Feather Bookmarks",
    "Crocodile Clip Pens",
    "Panda Pajamas",
    "Cheetah Chase Board Games",
    "Owl Optics Binoculars",
    "Bison Belts",
    "Kangaroo Carry Bags",
    "Sloth Sleep Masks",
    "Porcupine Pins",
    "Hippo Hand Towels",
    "Gazelle Gel Pens",
    "Tortoise Time Clocks",
    "Coral Reef Calendars",
    "Jungle Beat Headphones"
]
shop_ids = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]              # Example Shop IDs
customer_ids = [2, 3, 4, 5, 6, 7, 8, 9, 12] # Example Customer IDs


for i in range(27):
    # shop_id = random.choice(shop_ids)
    # customer_id = random.choice(customer_ids)
    name = item_names[i]
    stock = random.randint(1, 50)  # Quantities between 1 and 10
    price = random_price(1, 50)

    print(f"INSERT INTO ITEMS (Name, Stock, Price) VALUES ('{name}', {stock}, {price});\n")