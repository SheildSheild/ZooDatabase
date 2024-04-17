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

# Define possible values for Item_ID, Shop_ID, and Customer_ID
item_ids = [2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2338, 2339, 2340, 2341, 2342, 2343, 2344, 2345, 2346, 2347]
shop_ids = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]              # Example Shop IDs
customer_ids = [2, 3, 4, 5, 6, 7, 8, 9, 12] # Example Customer IDs


for i in range(100):
    item_id = random.choice(item_ids)
    shop_id = random.choice(shop_ids)
    customer_id = random.choice(customer_ids)
    quantity = random.randint(1, 10)  # Quantities between 1 and 10
    date = random_date("2023-12-01", "2024-05-31", random.random())

    print(f"INSERT INTO PURCHASES (Item_ID, Shop_ID, Customer_ID, Quantity, Date) VALUES ({item_id}, {shop_id}, {customer_id}, {quantity}, '{date}');")