import random
from datetime import datetime, timedelta

medics = [3, 5, 10, 11, 13]

animal_ids = [3, 83, 90, 92, 95, 96, 98, 99, 100, 107, 117, 124, 126, 130, 137, 141, 142, 144, 147, 149, 157, 158, 159,
              161, 165, 166, 170, 171, 172, 177, 181, 182, 183, 184, 188, 201, 202, 203, 211, 212, 216, 219, 220, 222,
              226, 227, 231, 232, 233, 235, 236, 237, 238, 239, 243, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256,
              257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277,
              278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298,
              299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319,
              320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335]

# List of possible descriptions for animal health records
descriptions = [
    "Routine check-up completed with no issues.",
    "Vaccination against common diseases.",
    "Minor injury treated from habitat mishap.",
    "Underwent surgery for a broken limb.",
    "Dental cleaning and check-up.",
    "Treated for a skin infection.",
    "Rehabilitation from a previous injury.",
    "Nutritional assessment and diet plan update.",
    "Behavioral therapy for stress management.",
    "Treated for a common cold.",
    "Emergency treatment for ingesting a foreign object.",
    "Annual comprehensive health evaluation.",
    "Treated for allergies.",
    "Physical therapy session for muscle strengthening.",
    "Check-up for pregnancy or breeding purposes."
]

for i in range(50):
    animal_id = random.choice(animal_ids)
    primary_doctor = random.choice(medics)
    description = random.choice(descriptions)
    date_of_examination = (datetime.now() + timedelta(days=random.randint(-365, 0))).date()

    print(f"INSERT INTO ANIMAL_HEALTH (Animal_ID, Primary_Doctor, Description, Date_of_Examination) VALUES ({animal_id}, '{primary_doctor}', '{description}', '{date_of_examination}');")

