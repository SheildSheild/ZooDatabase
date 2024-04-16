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
item_ids = [2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2338, 2339, 2340, 2341, 2342, 2343, 2344, 2345, 2346, 2347, 2348, 2349, 2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2384, 2385, 2386, 2387, 2388, 2389, 2390, 2391, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2399, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2433, 2434, 2435, 2436, 2437, 2438, 2439, 2440, 2441, 2442, 2443, 2444, 2445, 2446, 2447, 2448, 2449, 2450, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 2458, 2459, 2460, 2461, 2462, 2463, 2464, 2465, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2485, 2486, 2487, 2488, 2489, 2490, 2491, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512, 2513, 2514, 2515, 2516, 2517, 2518, 2519, 2520, 2521, 2522, 2523, 2524, 2525, 2526, 2527, 2528, 2529, 2530, 2531, 2532, 2533, 2534, 2535, 2536, 2537, 2538, 2539, 2540, 2541, 2542, 2543, 2544, 2545, 2546, 2547, 2548, 2549, 2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567, 2568, 2569, 2570, 2571, 2572, 2573, 2574, 2575, 2576, 2577, 2578, 2579, 2580]  # Example Item IDs
shop_ids = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]              # Example Shop IDs
customer_ids = [2, 3, 4, 5, 6, 7, 8, 9, 12] # Example Customer IDs


for i in range(100):
    item_id = random.choice(item_ids)
    shop_id = random.choice(shop_ids)
    customer_id = random.choice(customer_ids)
    quantity = random.randint(1, 15)  # Quantities between 1 and 10
    date = random_date("2023-12-01", "2024-05-31", random.random())

    print(f"INSERT INTO PURCHASES (Item_ID, Shop_ID, Customer_ID, Quantity, Date) VALUES ({item_id}, {shop_id}, {customer_id}, {quantity}, '{date}');")